const Api = require('./api');

const jwt = process.env.PUBG_API_KEY;

const api = new Api(jwt);

const shard = "pc-na";
const playerName = "curlyBoy";
const playerId = "account.b96c8e4d474a48d291c38e850ccd951e"; // for curlyBoy

// Example of how you'd search for a player, can supply multiple in the array
// return api.searchPlayersByName(shard, [playerName]).then(players => {
//     console.log(JSON.stringify(players));
//     return players.data[0].id;
// })

return api.getPlayer(shard, playerId).then(player => {
    console.log(JSON.stringify(player, null, 4));
    return api.getMatch(shard, player.data.relationships.matches.data[0].id);
}).then(match => {
    console.log(JSON.stringify(match, null, 4));
});
