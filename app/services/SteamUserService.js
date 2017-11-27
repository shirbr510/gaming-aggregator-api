// @flow
import axios from 'axios';
import * as _ from 'lodash';
const baseUri='http://api.steampowered.com/ISteamUser';

 class UserService {

    API_KEY: string;

    constructor(){
        this.API_KEY=process.env.STEAM_API_KEY
    }

    async getPlayerSummary(steamId: number){
        const players= await this.getPlayerSummaries([steamId]);
        return _.first(players);
    }

    async getPlayerSummaries(steamIds: Array<number>){
        const params = {
            key: this.API_KEY,
            format: "json",
            steamIds: steamIds.join(','),
        }
        const response = await axios.get(`${baseUri}/GetPlayerSummaries/v0002/`,{ params });
        const data= response.data.response;
        return data.players;
    }
};

export default UserService;