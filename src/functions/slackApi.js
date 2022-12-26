export const checkBotMembership = async (client, channel_id) => {
  // Get list of members in channel
  let { members: channelMembers } = await client.conversations.members({
    channel: channel_id
  });

  // Obtain bot id
  const { user_id: bot_id } = await client.auth.test();

  // Return membership status
  if (channelMembers.includes(bot_id)) {
    // If bot is a member, return members array without bot
    channelMembers = channelMembers.filter(member => member !== bot_id);
    return { bot_id, channelMembers, membership: true };
  }
  // Otherwise, return members as is with membership set to false
  else {
    return { bot_id, channelMembers, membership: false };
  };
};
