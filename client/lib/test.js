const Api = require('./api');

const api = new Api("my-litte-api-key", "xbox-na");

// Can also set some params after instantiation
api.setShard("pc-na");
api.setApiKey(process.env.PUBG_API_KEY);

// Example of how you'd search for a player, can supply multiple in the array
// return api.searchPlayersByName(shard, ["curlyBoy"]).then(players => {
//     console.log(JSON.stringify(players));
//     return players.data[0].id;
// })

const playerId = "account.b96c8e4d474a48d291c38e850ccd951e"; // curlyBoy

return api.getPlayer(playerId).then(player => {
    console.log(JSON.stringify(player, null, 4));
    return api.getMatch(player.data.relationships.matches.data[0].id);
}).then(match => {
    console.log(JSON.stringify(match, null, 4));
});
