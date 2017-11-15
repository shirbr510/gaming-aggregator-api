// @flow

import * as firebase from 'firebase'
import * as _ from 'lodash';
import bcrypt from "bcrypt";
import { linkPlatform } from '../controllers/auth';

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

export function getUsers() {
    return database.ref(COLLECTION_BASE_ROUTE).once('value').then(snapshot=>snapshot.val());
}

export function getUser(userId: string) {
    return database.ref(`${COLLECTION_BASE_ROUTE}/${userId}`).once('value').then(snapshot=>snapshot.val());
}

export async function getUserByEmail(email: string) {
    const userswithSpecificEmailRef = database.ref(`${COLLECTION_BASE_ROUTE}`).orderByChild("email").equalTo(email).limitToFirst(1);
    const users = await userswithSpecificEmailRef.once('value').then(snapshot => snapshot.val());
    const usersArray = _.map(Object.keys(users), key => users[key]);
    return usersArray.length > 0 ? _.first(usersArray) : {};
}

export async function getUserByOpenId(openId: string) {
    const usersPlatforms = database.ref(`${COLLECTION_BASE_ROUTE}`).child("platforms").once('value').then(snapshot => snapshot.val());
    const matchingUser=_.find(usersPlatforms,userPlatforms=>{
        return _.chain(Object.keys(userPlatforms)).map(key=>userPlatforms[key]).find(platformValue=>platformValue.id===openId).value();
    })
    return matchingUser;
}

export async function linkPlatformToUser(userId: string, platformName: string, data: object) {
        await database.ref(`${COLLECTION_BASE_ROUTE}/${userId}/platforms/${platformName}`).set(data);
        return await getUser(userId);
    }