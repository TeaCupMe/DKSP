const { SlashCommandBuilder } = require('discord.js');
// Importing dgram module
const net = require('net');
 
// Creating and initializing client
// and server socket


module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		var client = new net.Socket();
		client.connect(9999, '127.0.0.1', function() {
		console.log('Connected');
		client.write('Hello, server! Love, Client.');
			});
		await client.on('data', function(data) {
				console.log('Received: ' + data);
				interaction.reply(data.toString());
				client.destroy(); // kill client after server's response
				
		});
		
		
	},
};
