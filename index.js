const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const roleInfo = config.roleInfo;

let roleList = "Your string here";

client.login(config.BOT_TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} (ID ${client.user.id})`);
    client.user.setActivity("Keepin yo Roles");
});

client.on('message', async (msg) => {
    if (!msg.content.toLowerCase().startsWith(config.prefix) || msg.author.bot) return;


    const guild = msg.guild;
    //console.log(guild);
    const args = msg.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const role = msg.guild.roles.cache.find(role => role.name.toLowerCase() === args[1]);
    const member = msg.member;
    
    if (command == 'ping') {
        const timeTaken = Date.now() - msg.createdTimestamp;
        msg.reply(`Pong! This message has a latency of ${timeTaken}ms.`);
    }

    else if ((command == 'customrole') || (command == 'cr') || (command == 'role')) {

        if (args.length == 0) {
            msg.channel.send(roleInfo);
        }

        switch(args[0]){
            case 'apply':
                if ((args[1] === 'Castle') || (args[1] === 'Moderator') || (args[1] === 'Facebook Admin/Mods')){
                    //do nothing
                    console.log('if statement ' + args[1]);
                } else if (role != undefined) {
                    console.log(`Applying ${role.name} to ${msg.member.displayName}`);
                    member.roles.add(role);
                    msg.reply('Role Applied!');
                } else {
                    msg.channel.send('Role not found on this server');
                    console.log(`Did not find ${args[1]} as a role on ${guild.name}`);
                }
                break;
            case 'remove':
                msg.reply('Role removed!');
                member.roles.remove(role);
                break;
            case 'relieve':
                msg.reply('Role relieved!');
                member.roles.remove(role);
                break;
            case 'list':
                msg.channel.send(roleList);
                break;
            default:
                break;
        }
    }
});
