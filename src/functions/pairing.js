import { setTime, getTime, interval } from "../lib/constants.js";

// Shuffle/randmoize array logic
export const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
};

export const filterActive = (channelMembers, membersArr) => {
  const activeMembers = [];
  for (let i = 0; i < membersArr.length; i++) {
    const key = Object.keys(membersArr[i])[0];
    if (membersArr[i][key].isActive) {
      activeMembers.push(key);
    }
  }
  return activeMembers;
};

export const filterFrequency = (activeMembers, membersArr) => {
  const currentDate = new Date();
  let readyMembers = [];
  for (let i = 0; i < activeMembers.length; i++) {
    const index = membersArr.findIndex(member => Object.keys(member)[0] === activeMembers[i]);
    const userObj = membersArr[index][activeMembers[i]];
    const lastPairDate = new Date(userObj.lastPairing.toISOString());
    const nextPairDate = new Date(lastPairDate[setTime](lastPairDate[getTime]() + parseInt(userObj.frequency)));

    if (currentDate > nextPairDate) {
      readyMembers.push(activeMembers[i]);
    };
  }
  return { readyMembers, currentDate };
};

export const filterRestriction = (readyMembers, membersArr) => {
  for (let i = 0; i < readyMembers.length; i++) {
    const index = membersArr.findIndex(member => Object.keys(member)[0] === readyMembers[i]);

    if (readyMembers[i] === readyMembers[i + 1]) {
      readyMembers = shuffle(readyMembers);
      i = 0;
    }
    if (membersArr[index][readyMembers[i]].restrict.length !== 0 && i % 2 === 0 && membersArr[index][readyMembers[i]].restrict.includes(readyMembers[i + 1])) {
      readyMembers = shuffle(readyMembers);
      i = 0;
    }
    else if (membersArr[index][readyMembers[i]].restrict.length !== 0 && i % 2 !== 0 && membersArr[index][readyMembers[i]].restrict.includes(readyMembers[i - 1])) {
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
