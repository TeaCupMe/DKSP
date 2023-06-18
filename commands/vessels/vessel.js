const { SlashCommandBuilder, InteractionType } = require('discord.js');
// Importing dgram module
const net = require('net');
 
// Creating and initializing client
// and server socket


module.exports = {
	data: new SlashCommandBuilder()
		.setName('vessel')
		.setDescription('Replies count of active vessels')
        .addIntegerOption(option =>
            option.setName('index')
                .setDescription('The input to echo back')
                .setRequired(true)),
    /** 
* 
* @param {InteractionType} interaction 
*/
	async execute(interaction) {
		var client = new net.Socket();
		client.connect(11242, '127.0.0.1', function() {
		console.log('Connected');
		client.write("vessel " + interaction.options.getInteger('index').toString());
			});
		await client.on('data', function(data) {
				console.log(data);
				// interaction.reply("**" + data.toString()+ "** of **active** vessels in the universe");
                var exampleEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    // .setTitle("Information")
                    .setURL('https://discord.js.org/')
                    .setAuthor({ name: 'CrTech KSP Server', iconURL: 'https://media.graphassets.com/5MISZg2Q5q82u7LqG3KQ', url: 'https://crtech.blog' })
                    .setDescription('**' + data.toString() + '**')
                    // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                    // .addFields(
                    //     { name: 'Regular field title', value: 'Some value here' },
                    //     { name: '\u200B', value: '\u200B' },
                    //     { name: 'Inline field title', value: 'Some value here', inline: true },
                    //     { name: 'Inline field title', value: 'Some value here', inline: true },
                    // )
                    // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
                    // .setImage('https://i.imgur.com/AfFp7pu.png')
                    .setTimestamp()
                    .setFooter({ text: 'LMP Manager', iconURL: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRUFOKY2qhwQD_aTXRNMUiTSzrJIG6lfokAbN_lcHcvX2mEM-0j' });
                interaction.reply({embeds: [exampleEmbed]})
				client.destroy(); // kill client after server's response	
		});	
	},
};


const { EmbedBuilder } = require('discord.js');

// inside a command, event listener, etc.


// channel.send({ embeds: [exampleEmbed] });