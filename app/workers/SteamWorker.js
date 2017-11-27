// @flow
import * as _ from 'lodash';
import * as usersProvider from '../database/users'
import * as steamGames from '../database/steamGames'
import PlayerService from '../services/SteamPlayerService'
import UserService from '../services/SteamUserService'
const {STEAM_API_KEY} = process.env;
const playerService = new PlayerService();
const userService = new UserService();

export const runGamesWorker= async()=>{
    const users=await usersProvider.getUsers();
    _.each(users,async user=>{
        if(user.platforms){
            const{platforms:{steam}}=user;
            const {platformId} = steam;
            const {games} = await playerService.getOwnedGames(platformId,true,true);
            steamGames.setUserSteamGames(user.id,games);
        }
    })
}

export const runUserWorker= async()=>{
    const users=await usersProvider.getUsers();
    _.each(users,async user=>{
        if(user.platforms){
            const{platforms:{steam}}=user;
            const {platformId} = steam;
            const userInfo = await userService.getPlayerSummary(platformId);
            //TODO: Do something with user's info
        }
    })
}