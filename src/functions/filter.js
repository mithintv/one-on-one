import shuffle from "./shuffle.js";

export const filterActive = (channelMembers, membersObj) => {
  const activeMembers = [];
  for (let i = 0; i < channelMembers.length; i++) {
    if (membersObj[channelMembers[i]].isActive) {
      activeMembers.push(channelMembers[i]);
    }
  }
  return activeMembers;
};

export const filterFrequency = (activeMembers, membersObj) => {
  const currentDate = new Date();
  let readyMembers = [];
  for (let i = 0; i < activeMembers.length; i++) {
    const lastPairDate = new Date(membersObj[activeMembers[i]].lastPairing.toISOString());
    const nextPairDate = new Date(lastPairDate.setMinutes(lastPairDate.getMinutes() + parseInt(membersObj[activeMembers[i]].frequency)));
    if (currentDate.getTime() > nextPairDate.getTime()) {
      readyMembers.push(activeMembers[i]);
    };
  }
  return { readyMembers, currentDate };
};

export const filterRestriction = async (readyMembers, membersObj) => {
  for (let i = 0; i < readyMembers.length; i++) {
    if (readyMembers[i] === readyMembers[i + 1]) {
      readyMembers = shuffle(readyMembers);
      i = 0;
    }
    if (membersObj[readyMembers[i]].restrict.length !== 0 && i % 2 === 0 && membersObj[readyMembers[i]].restrict.includes(readyMembers[i + 1])) {
      readyMembers = shuffle(readyMembers);
      i = 0;
    }
    else if (membersObj[readyMembers[i]].restrict.length !== 0 && i % 2 !== 0 && membersObj[readyMembers[i]].restrict.includes(readyMembers[i - 1])) {
      readyMembers = shuffle(readyMembers);
      i = 0;
    }
  }
  return readyMembers;
};

export const stringifyPairings = (filteredMembers) => {
  let pairings = '';
  for (let i = 0; i < filteredMembers.length; i++) {
    if (i % 2 === 0) {
      pairings += `<@${filteredMembers[i]}> <-> `;
    } else pairings += `<@${filteredMembers[i]}>\n`;
  }
  return pairings;
};
