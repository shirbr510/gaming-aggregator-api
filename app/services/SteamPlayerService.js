// @flow
import axios from 'axios';
const baseUri='http://api.steampowered.com/IPlayerService';

 class PlayerService {

    API_KEY: string;

    constructor(){
        this.API_KEY=process.env.STEAM_API_KEY
    }

    async getOwnedGames(steamId: number, include_appinfo: boolean = false, include_played_free_games: boolean = false){
        const params = {
            key: this.API_KEY,
            format: "json",
            steamId,
            include_appinfo,
            include_played_free_games
        }
        const response = await axios.get(`${baseUri}/GetOwnedGames/v0001/`,{ params });
        return response.data.response;
    }
};

export default PlayerService;