// import bot token from .env file
const TOKEN = require('dotenv').config();

// import discord.js module
const {Client,GatewayIntentBits} = require('discord.js');

// not sure what this does
const { json } = require('stream/consumers');

// configure permissions(intents)
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
	]
});

// log successful login
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// respond to messages if they include certain words
client.on("messageCreate", async function (message) {

// ignore messages from bots
  if (message.author.bot) return;

  // "manly" triggers Ron Swanson Quotes
  else if (message.content.toLowerCase().includes("swanson")) {
	let response = await fetch("http://ron-swanson-quotes.herokuapp.com/v2/quotes");
	let data = await response.json();
	message.reply(`${data}`);
	}
});

// bot login using token from .env file
client.login(process.env.TOKEN);
