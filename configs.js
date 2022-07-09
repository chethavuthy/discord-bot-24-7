require("dotenv").config();

const config = {
  telegram: {
    apiId: +process.env.TELEGRAM_API_ID,
    apiHash: process.env.TELEGRAM_API_HASH,
    token: process.env.TELEGRAM_TOKEN,
    groupId: +process.env.TELEGRAM_GROUP_ID,
  },
  discord: {
    token: process.env.DISCORD_TOKEN,
  },
};

module.exports = config;
