// @flow

import passport from "passport";
import { serializeOpenId } from "../serializers/steamAuthenticationSerializer";
import {getUsers, linkPlatformToUser, getUser} from '../database/users'

export const localAuth=passport.authenticate('local');

export const localAuthCallback=(request, response) => {
    const {user} = request;
    response.send(user);
};

export const steamAuth=passport.authenticate('steam');

export const steamAuthCallback=async (request, response) => {
    const {query} = request;
    const openIdData = serializeOpenId(query);
    const users = await getUsers();
    const userId=Object.keys(users)[0];
    await linkPlatformToUser(userId,'steam',openIdData);
    const user = await getUser(userId);
    response.send(user);
};

