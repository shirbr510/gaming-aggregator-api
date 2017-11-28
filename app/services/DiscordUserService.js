// @flow
import axios from 'axios';
const baseUri='https://discordapp.com/api';

 class UserService {

    async getUser(discordUserId: number){
        const response = await axios.get(`${baseUri}/users/${discordUserId}`,);
        return response.data.response;
    }
};

export default UserService;
