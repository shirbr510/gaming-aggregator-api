// @flow

import * as firebase from 'firebase'
import * as _ from 'lodash';
import bcrypt from "bcrypt";
import { linkPlatform } from '../controllers/auth';
import * as usersToUserPlatforms from './usersToUserPlatforms';

const saltRounds = 10;
const COLLECTION_BASE_ROUTE = '/users';

const database = firebase.database();

export async function createUser(username, email, password) {
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = {
        username,
        email,
        password: passwordHash
    };
    const userRef = database.ref(COLLECTION_BASE_ROUTE).push(user);
    if(userRef){
        return userRef.key
    }
    throw 'failed to push user';
}

export async function getUsers() {
    return await database.ref(COLLECTION_BASE_ROUTE).once('value').then(snapshot=>snapshot.val());
}

export async function getUser(userId: string) {
    const user = await database.ref(`${COLLECTION_BASE_ROUTE}/${userId}`).once('value').then(snapshot=>snapshot.val());
    return Object.assign({},user,{id:userId});
}

export async function getUserByEmail(email: string) {
    const userswithSpecificEmailRef = database.ref(`${COLLECTION_BASE_ROUTE}`).orderByChild("email").equalTo(email).limitToFirst(1);
    const users = await userswithSpecificEmailRef.once('value').then(snapshot => snapshot.val());
    const usersArray = _.map(Object.keys(users), key => users[key]);
    return usersArray.length > 0 ? _.first(usersArray) : {};
}

export async function getUserByPlatformId(platformId: string) {
    const userToPlatformUser = await usersToUserPlatforms.getByPlatformId(platformId);
    if(!userToPlatformUser){
        return undefined;
    }
    const user = await getUser(userToPlatformUser.userId);
    return user;
}