// Require the necessary discord.js classes
const axios = require('axios');
const jsdom = require('jsdom');
const moment = require('moment');

const { JSDOM } = jsdom;
const {
  Client, GatewayIntentBits, EmbedBuilder,
} = require('discord.js');
require('dotenv').config();

const tonni = 'https://raw.githubusercontent.com/JonoBoss/jonoboss/main/img/tonni.webp';
const kontsa = 'https://raw.githubusercontent.com/JonoBoss/jonoboss/main/img/kontsa.webp';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  await interaction.deferReply();

  if (commandName === 'jono') {
    await axios.get('https://queue.imsundee.com/')
      .then((res) => {
        const parsedHTML = new JSDOM(res.data);
        const queue = parsedHTML.window.document.getElementsByClassName('alert');
        const queueSize = queue[0].textContent.split(/\r?\n/)[2].split(':')[1].trim();
        const queueTime = queue[0].textContent.split(/\r?\n/)[3].split(':')[1].trim();
        const lastUpdated = parsedHTML.window.document.querySelectorAll('h4')[1].textContent.substring(13, 22).trim();
        const lastUpdatedCorrectTimezone = moment(lastUpdated, 'HH:mm:ss')
          .add(2, 'h')
          .format('HH:mm:ss');

        const bgColor = queueTime === '0' ? '226f54' : 'da2c38';

        const exampleEmbed = new EmbedBuilder()
          .setColor(bgColor)
          .setTitle('Gehennas jono')
          .setThumbnail(queueTime === '0' ? tonni : kontsa)
          .addFields(
            { name: 'Queue size:', value: queueSize },
            { name: 'Estimated time:', value: `${queueTime} minutes` },
            { name: 'Last updated:', value: lastUpdatedCorrectTimezone },
          );

        interaction.editReply({ embeds: [exampleEmbed] });
      })
      .catch((error) => console.log(error));
  }
});
// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
