// @flow

import * as firebase from 'firebase'
import * as _ from 'lodash';
import bcrypt from "bcrypt";
import { linkPlatform } from '../controllers/auth';
import * as usersToUserPlatforms from './usersToUserPlatforms';

const saltRounds = 10;
const COLLECTION_BASE_ROUTE = '/users';

const database = firebase.database();

const enrichUser = async user =>{
    try{
        const {id} = user;
        const platforms = await usersToUserPlatforms.getByUserId(id);
        if(platforms){
            return Object.assign({},user,{platforms});
        }
        return user
    }
    catch(err){
        return user;
    }
}

const enrichUsers= (users)=>Promise.all(_.map(users,enrichUser));

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
    const users= await database.ref(COLLECTION_BASE_ROUTE).once('value').then(snapshot=>snapshot.val());
    const usersArray = _.map(Object.keys(users), key => {
        const user =Object.assign({},users[key],{id:key});
        return user;
    });
    return await enrichUsers(usersArray);
}

export async function getUser(userId: string) {
    const user = await database.ref(`${COLLECTION_BASE_ROUTE}/${userId}`).once('value').then(snapshot => Object.assign({id:snapshot.key},snapshot.val()));
    return await enrichUser(user);
}

export async function getUserByEmail(email: string) {
    const userswithSpecificEmailRef = database.ref(`${COLLECTION_BASE_ROUTE}`).orderByChild("email").equalTo(email).limitToFirst(1);
    const users = await userswithSpecificEmailRef.once('value').then(snapshot => Object.assign({id:snapshot.key},snapshot.val()))
    const user = users.length>0? _.first(users):undefined;
    if(user){
        return await enrichUser(user);
    }
    return undefined;
}

export async function getUserByPlatformId(platformId: string) {
    try{
        const userToPlatformUser = await usersToUserPlatforms.getByPlatformId(platformId);
        return userToPlatformUser?
            await getUser(userToPlatformUser.userId):
            undefined;
    }
    catch(err){
        return undefined;
    }
}