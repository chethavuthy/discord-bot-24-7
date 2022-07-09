const moment = require("moment");

function getRandomEmoji() {
  const emojiList = [
    "😭",
    "😄",
    "😌",
    "🤓",
    "😎",
    "😤",
    "🤖",
    "😶‍🌫️",
    "🌏",
    "📸",
    "💿",
    "👋",
    "🌊",
    "✨",
  ];
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}

function getChannelNameById(client, channelId) {
  return client.channels.cache.get(channelId)?.name;
}

function getDiff(joinedMap, key) {
  return moment.duration(moment().diff(joinedMap.get(key))).humanize();
}

function sendMsgAndLog(bot, groupId, msg) {
  bot.telegram.sendMessage(groupId, msg);
  console.log(msg);
}

module.exports = {
  getRandomEmoji,
  getChannelNameById,
  getDiff,
  sendMsgAndLog,
};
