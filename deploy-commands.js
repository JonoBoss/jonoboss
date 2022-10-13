const { REST, SlashCommandBuilder, Routes } = require('discord.js');
require('dotenv').config();

const { DISCORD_TOKEN, clientId, guildId } = process.env;

const commands = [
  new SlashCommandBuilder().setName('jono').setDescription('Anna tulla hyvä jono älä tule paha jono'),
]
  .map((command) => command.toJSON());

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
  .catch(console.error);
