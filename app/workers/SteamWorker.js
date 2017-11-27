// @flow
import * as _ from 'lodash';
import * as usersProvider from '../database/users'
import * as steamGames from '../database/steamGames'
import PlayerService from '../services/SteamPlayerService'
const {STEAM_API_KEY} = process.env;
const playerService = new PlayerService();

const getUserGames=async (steamUserId)=>{
    const gamesObject=await playerService.getOwnedGames(steamUserId,true,true);
    return gamesObject.games;
}

export const runGamesWorker= async()=>{
    const users=await usersProvider.getUsers();
    _.each(users,async user=>{
        if(user.platforms){
            const{platforms:{steam}}=user;
            const {platformId} = steam;
            const games = await getUserGames(platformId);
            steamGames.setUserSteamGames(user.id,games);
        }
    })
}