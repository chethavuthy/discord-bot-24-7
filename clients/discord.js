const { Client, Intents } = require("discord.js");
const moment = require("moment");
const { discord, telegram } = require("../configs");
const { getRandomEmoji, getChannelNameById, getDiff } = require("../utils");
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
    const memberId = oldState.member.id;

    const oldChannelName = getChannelNameById(client, oldState.channelId);
    const newChannelName = getChannelNameById(client, newState.channelId);

    let message = `${username} `;

    if (!newState.channelId) {
      const diff = getDiff(joined, memberId);

      message += `left ${oldChannelName} (${diff})`;
    } else if (!oldState.channelId) {
      joined.set(memberId, moment());

      message += `joined ${newChannelName}`;
    } else {
      const diff = getDiff(joined, memberId);
      joined.set(memberId, moment());

      message += `moved from ${oldChannelName} to ${newChannelName} (${diff})`;
    }

    bot.telegram.sendMessage(telegram.groupId, message);

    console.log(message);
  });

  client.login(discord.token);
}

module.exports = initDiscord;
