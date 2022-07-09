const { Telegraf } = require("telegraf");
const { telegram } = require("../configs");
const { getRandomEmoji } = require("../utils");

const bot = new Telegraf(telegram.token);

async function initTelegram() {
  bot.launch();

  console.log(`Logged in as telegram bot ${getRandomEmoji()}`);
}

module.exports = {
  initTelegram,
  bot,
};
