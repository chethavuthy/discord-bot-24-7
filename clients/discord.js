const { Client, Intents } = require("discord.js");
const moment = require("moment");
const { discord, telegram } = require("../configs");
const {
  getRandomEmoji,
  getChannelNameById,
  getDiff,
  sendMsgAndLog,
} = require("../utils");
const { bot } = require("./telegram");

const joined = new Map();

async function initDiscord() {
  const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES],
  });

  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag} ${getRandomEmoji()}`);
  });

  client.on("voiceStateUpdate", (oldState, newState) => {
    if (oldState.member.user.bot) return;

    const { username } = oldState.member.user || {};
    const { id: memberId } = oldState.member || {};

    const oldChannelName = getChannelNameById(client, oldState.channelId);
    const newChannelName = getChannelNameById(client, newState.channelId);

    if (!newState.channelId) {
      const diff = getDiff(joined, memberId);
      const message = `${username} left ${oldChannelName} (${diff})`;

      sendMsgAndLog(bot, telegram.groupId, message);
    } else if (!oldState.channelId) {
      const message = `${username} joined ${newChannelName}`;

      joined.set(memberId, moment());

      sendMsgAndLog(bot, telegram.groupId, message);
    } else if (oldChannelName !== newChannelName) {
      const diff = getDiff(joined, memberId);
      const message = `${username} moved from ${oldChannelName} to ${newChannelName} (${diff})`;

      joined.set(memberId, moment());

      sendMsgAndLog(bot, telegram.groupId, message);
    }
  });

  client.login(discord.token);
}

module.exports = initDiscord;
