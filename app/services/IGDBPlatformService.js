// @flow
import axios from 'axios';
import fs from 'fs';

 class PlatformService {

    API_KEY: string;

    constructor(){
        const {IGDB_API_KEY, IGDB_ENDPOINT} = process.env;
        // this.API_KEY=IGDB_API_KEY
        this.API_KEY="9095a2cd4db1a2c096ea235e575f3205"
        // this.BASE_URI=IGDB_ENDPOINT
        this.IGDB_ENDPOINT="https://api-2445582011268.apicast.io"
    }

    async getPlatforms(page:number = 1, limit:number = 50,fields: string = "id,name,slug,games",expand: string){
        const headers ={
          "Accept": 'application/json',
          "user-key": this.API_KEY
        }
        let params = {
            limit,
            scroll:page,
            fields
        }
        if(expand){
            params.expand=expand;
        }
        const response = await axios.get(`${this.IGDB_ENDPOINT}/platforms/`,{ params,headers });
        return response.data;
        // return await fs.readFileSync('./testresult7.txt',);
    }
};

export default PlatformService;
