const axios = require('axios');

const shards = [
    'xbox-as',
    'xbox-eu',
    'xbox-na',
    'xbox-oc',
    'pc-krjp',
    'pc-na',
    'pc-eu',
    'pc-oc',
    'pc-kako',
    'pc-sea',
    'pc-sa',
    'pc-as'
];

class Api {

    constructor(apiKey) {
        this._client = axios.create({
            baseURL: "https://api.playbattlegrounds.com",
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/vnd.api+json'
            }
        });
    }

    getStatus() {
        return this._client.get(`/status`).then(parseResp);
    }

    searchPlayersById(shard, playerIds) {
        validateShard(shard);
        const opts = {
            params: {
                'filter[playerIds]': playerIds.join(',')
            }
        };
        return this._client.get(`/shards/${shard}/players`, opts).then(parseResp);
    }

    searchPlayersByName(shard, playerNames) {
        validateShard(shard);
        const opts = {
            params: {
                'filter[playerNames]': playerNames.join(',')
            }
        };
        return this._client.get(`/shards/${shard}/players`, opts).then(parseResp);
    }

    getPlayer(shard, playerId) {
        validateShard(shard);
        return this._client.get(`/shards/${shard}/players/${playerId}`).then(parseResp);
    }

    getMatch(shard, matchId) {
        validateShard(shard);
        return this._client.get(`/shards/${shard}/matches/${matchId}`).then(parseResp);
    }

}

function validateShard(shard) {
    if (!shards.includes(shard)) {
        throw new Error(`Shard ${shard} not found`);
    }
}

function parseResp(resp) {
    return resp.data;
}

module.exports = Api;
