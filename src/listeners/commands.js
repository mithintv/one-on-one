const pair = async ({ client, command, ack, respond }) => {

  try {
    // Acknowledge command request
    await ack();

    // Obtain channel id where command was executed
    const { channel_id } = command;
    // Get list of members in channel
    let { members } = await client.conversations.members({
      channel: channel_id
    });

    // Filter out bot from list of members
    const { user_id } = await client.auth.test();
    members = members.filter(member => member !== user_id);
    members = members.filter(member => member !== 'U04EMKFLADB');


    // Shuffle members array
    function shuffle(array) {
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
    }
    members = shuffle(members);
    console.log(members);

    // Create output message for pairings
    let pairings = "Here are this week's pairings: \n";

    // Even pairings
    for (let i = 0; i < members.length; i++) {
      if (i % 2 === 0) {
        pairings = pairings.concat(`<@${members[i]}>`, ' <-> ');
      } else pairings = pairings.concat(`<@${members[i]}>`, '\n');
    }
    // Odd pairings
    if (members.length % 2 !== 0) {
      pairings = pairings.concat(`<@${members[0]}>`);
    }

    console.log(pairings);
    await respond(pairings);

  } catch (error) {
    console.error(error);
  }
};


const frequency = async ({ client, command, ack, respond }) => {
  try {
    // Acknowledge command request
    await ack();

    console.log(command);
  }
  catch (error) {
    console.error(error);
  }
};



export default function registerCommands(app) {

  app.command('/pair', pair);
  app.command('/frequency', frequency);
}
