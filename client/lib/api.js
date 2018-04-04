const axios = require('axios');

const baseApiUrl = `https://api.playbattlegrounds.com`;
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

    constructor(apiKey, shard) {
        validateShard(shard);
        this._client = axios.create({
            baseURL: makeUrl(shard),
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/vnd.api+json'
            }
        });
    }

    /**
     * Sets the JWT for authentication
     * @param apiKey
     */
    setApiKey(apiKey) {
        this._client.defaults.headers.Authorization = `Bearer ${apiKey}`;
    }

    /**
     * Sets the server shard
     * @param shard
     */
    setShard(shard) {
        validateShard(shard);
        this._client.defaults.baseURL = makeUrl(shard);
    }

    /**
     * Gets the status of the PUBG API
     * @returns {PromiseLike<T> | Promise<T> | void | undefined}
     */
    getStatus() {
        return this._client.get(`${baseApiUrl}/status`).then(parseResp);
    }

    /**
     * Search for players by their IDs
     * @param playerIds an array of player ids
     * @returns {PromiseLike<T> | Promise<T> | void | undefined}
     */
    searchPlayersById(playerIds) {
        const opts = {
            params: {
                'filter[playerIds]': playerIds.join(',')
            }
        };
        return this._client.get(`/players`, opts).then(parseResp);
    }

    /**
     * Search for players by their player names
     * @param playerNames an array of player names
     * @returns {PromiseLike<T> | Promise<T> | void | undefined}
     */
    searchPlayersByName(playerNames) {
        const opts = {
            params: {
                'filter[playerNames]': playerNames.join(',')
            }
        };
        return this._client.get(`/players`, opts).then(parseResp);
    }

    /**
     * Get a player by their ID
     * @param playerId
     * @returns {PromiseLike<T> | Promise<T> | void | undefined}
     */
    getPlayer(playerId) {
        return this._client.get(`/players/${playerId}`).then(parseResp);
    }

    /**
     * Get a match by it's ID
     * @param matchId
     * @returns {PromiseLike<T> | Promise<T> | void | undefined}
     */
    getMatch(matchId) {
        return this._client.get(`/matches/${matchId}`).then(parseResp);
    }
}

function makeUrl(shard) {
    return `${baseApiUrl}/shards/${shard}`;
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
