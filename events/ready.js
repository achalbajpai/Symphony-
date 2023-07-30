const client = require("..");

client.on('ready', () => {
    client.user.setActivity(`Symphony Music!`,{type : "WATCHING"});
    console.log(`${client.user.username} Is Online`);
})
