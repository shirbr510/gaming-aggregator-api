// @flow
import axios from 'axios';

 class PlatformService {

    API_KEY: string;

    constructor(){
        this.API_KEY=process.env.IGDB_API_KEY
    }

    async getPlatforms(page:number = 1, limit:number = 50){
        const headers ={
          Accept: 'application/json',
          "user-key": this.API_KEY
        }
        const params = {
            limit,
            scroll:page,
        }
        const {IGDB_ENDPOINT} = process.env
        const response = await axios.get(`${IGDB_ENDPOINT}/platforms`,{ params,headers });
        return response.data;
    }
};

export default PlayerService;
