const client = new(require("discord.js").Client)
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const { Slash } = require("discord-slash-commands");
var express = require('express');
var app     = express();
const slash = new Slash({ client: client })
const embed = new MessageEmbed();

slash.on("create", (d) => {
    console.log(`Parancs létrehozva: ${JSON.parse(d.config.data).name}`)
})

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('FUT ', app.get('port'));
});


slash.on("command", async (command) => {
    if (command.name === "activities") {
        let channel = client.channels.cache.get(command.options.find(m => m.name === "channel").value);
        if (channel.type !== "voice") return command.callback("Channel must be a voice channel.")
        if (command.options.find(m => m.name === "type").value === "yt") {
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "755600276941176913",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    embed.setTitle("Event hozzáadva!")
                    embed.setDescription(`Hozzáadtam a/z **Youtube Együtt** eventet a [${channel.name}](https://discord.gg/${invite.code})\n> Szobához.`)
                    embed.setFooter(`${command.author.username + "#" + command.author.discriminator} által kérve`)
                    embed.setColor("#7289DA")
                    command.callback({
                        embeds: embed
                    });
                })

        }
        if (command.options.find(m => m.name === "type").value === "pn") {
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "755827207812677713",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    embed.setTitle("Event hozzáadva!")
                    embed.setDescription(`Hozzáadtam a/z **Poker Est**  eventet a [${channel.name}](https://discord.gg/${invite.code})\n> Szobához.`)
                    embed.setFooter(`${command.author.username + "#" + command.author.discriminator} által kérve`)
                    embed.setColor("#7289DA")
                    command.callback({
                        embeds: embed
                    });
                })

        }
        if (command.options.find(m => m.name === "type").value === "bio") {
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "773336526917861400",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    embed.setTitle("Event hozzáadva!")
                    embed.setDescription(`Hozzáadtam a/z **Betrayal.io**  eventet a [${channel.name}](https://discord.gg/${invite.code})\n> Szobához.`)
                    embed.setFooter(`${command.author.username + "#" + command.author.discriminator} által kérve`)
                    embed.setColor("#7289DA")
                    command.callback({
                        embeds: embed
                    });
                })

        }
        if (command.options.find(m => m.name === "type").value === "fio") {
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "814288819477020702",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    embed.setTitle("Event hozzáadva!")
                    embed.setDescription(`Hozzáadtam a/z **Fishington.io**  eventet a [${channel.name}](https://discord.gg/${invite.code})\n> Szobához.`)
                    embed.setFooter(`${command.author.username + "#" + command.author.discriminator} által kérve`)
                    embed.setColor("#7289DA")
                    command.callback({
                        embeds: embed
                    });
                })

        }
    }
})

client.on("ready", () => {
	client.user.setActivity(`"/activities" # Supreme Activity bot by ✘KanekiSan✞#7537`, { type: "PLAYING" });
    console.log("Ready");
    slash.create({
        guildOnly: false,
        data: {
            name: "Activities",
            description: "Játék vagy YouTube eventek",
            options: [{
                    name: "channel",
                    description: "Kérlek válassz egy HANG csatornát.",
                    required: true,
                    type: 7,
                },
                {
                    name: "type",
                    description: "Event stilusa.",
                    required: true,
                    type: 3,
                    choices: [{
                            name: "YouTube Együtt",
                            value: "yt"
                        },
                        {
                            name: "Betrayal.io",
                            value: "bio"
                        },
                        {
                            name: "Poker Est",
                            value: "pn"
                        },
                        {
                            name: "Fishington.io",
                            value: "fio"
                        }
                    ]
                }
            ]
        }
    })
})

client.login("")