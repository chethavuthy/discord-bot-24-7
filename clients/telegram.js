const { Telegraf } = require("telegraf");
const cron = require("node-cron");
const fetch = require("node-fetch");
const { telegram } = require("../configs");
const { getRandomEmoji, sendMsgAndLog } = require("../utils");

const bot = new Telegraf(telegram.token);
const quiteURL = "https://quotes.rest/qod.json?category=inspire";

async function initTelegram() {
  bot.launch();

  console.log(`Logged in as telegram bot ${getRandomEmoji()}`);

  cron.schedule("0 0 0 * * *", async () => {
    const response = await fetch(quiteURL);
    const quotes = await response.json();
    const quote = quotes.contents.quotes[0].quote;
    const author = quotes.contents.quotes[0].author;

    sendMsgAndLog(bot, telegram.groupId, `${quote} - ${author}`);
  });
}

module.exports = {
  initTelegram,
  bot,
};
