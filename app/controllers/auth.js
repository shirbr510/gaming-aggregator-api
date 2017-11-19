// @flow

import passport from "passport";
import { serializeOpenId } from "../serializers/steamAuthenticationSerializer";
import {getUsers, getUser, getUserByPlatformId,createUser} from '../database/users'
import * as usersToUserPlatforms from '../database/usersToUserPlatforms';
import { platform } from "os";

export const localAuth=passport.authenticate('local');

export const localAuthCallback=(request, response) => {
    const {user} = request;
    response.send(user);
};

export const steamAuth=passport.authenticate('steam');

export const linkPlatform=async (request, response) => {
    const {userId,platform, id,sig} = request.body;
    const createUserFlow = async()=>{
        const newUserId = await createUser(`${platform}${id}`,null,sig);
        await usersToUserPlatforms.create(newUserId,platform,id);
        return await getUser(newUserId);
    }
    let user;
    if(!userId){
        user = await getUserByPlatformId(id);
        if(!user){
            user = await createUserFlow();
        }
    }
    else{
        user = await createUserFlow();
    }
    response.send(user);
}

export const steamAuthCallback=(request, response) => {
    const {query} = request;
    const parsedQuery=serializeOpenId(query)
    const openIdData = Object.assign({},parsedQuery,{platform:'steam'});
    request.body=openIdData;
    return linkPlatform(request, response)
};

