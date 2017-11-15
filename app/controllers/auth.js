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
    const {platform, id,sig} = request.body;
    let {userId} = request.body;
    const openIdData = {id,sig};
    if(!userId){
        let user = await getUserByPlatformId(id);
        if(user){
            userId=user.id;
        }
        else{
            const newUserId = await createUser(`${platform}${id}`,null,sig);
            userId=newUserId
        }
    }
    await usersToUserPlatforms.create(userId,platform,id);
    const user = await getUser(userId);
    response.send(user);
}

export const steamAuthCallback=(request, response) => {
    const {query} = request;
    const parsedQuery=serializeOpenId(query)
    const openIdData = Object.assign({},parsedQuery,{platform:'steam'});
    request.body=openIdData;
    return linkPlatform(request, response)
};

