const initDiscord = require("./clients/discord");
const { initTelegram } = require("./clients/telegram");

async function init() {
  await initTelegram();
  await initDiscord();
}

init();
