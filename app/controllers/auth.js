// @flow

import passport from "passport";
import { serializeOpenId } from "../serializers/steamAuthenticationSerializer";
import {getUsers, linkPlatformToUser, getUser, getUserByOpenId,createUser} from '../database/users'
import { platform } from "os";

export const localAuth=passport.authenticate('local');

export const localAuthCallback=(request, response) => {
    const {user} = request;
    response.send(user);
};

export const steamAuth=passport.authenticate('steam');

export const linkPlatform=async (request, response) => {
    const {userId, platform, id,sig} = request.body;
    const openIdData = {userId,id,sig};
    let user = userId?
        await getUser(userId):
        await getUserByOpenId(id);
    if(!user){
        const newUserId = await createUser(`${platform}${id}`,null,sig);
        user={id:newUserId};
    }
    console.log(`user after everything`,user)
    const updatedUser = await linkPlatformToUser(user.id,platform,openIdData);
    response.send(updatedUser);
}

export const steamAuthCallback=(request, response) => {
    const {query} = request;
    const parsedQuery=serializeOpenId(query)
    const openIdData = Object.assign({},parsedQuery,{platform:'steam'});
    request.body=openIdData;
    return linkPlatform(request, response)
};

