// @flow

import * as firebase from 'firebase'
import * as _ from 'lodash';
import { linkPlatform } from '../controllers/auth';

const saltRounds = 10;
const COLLECTION_BASE_ROUTE = '/users-to-user-platforms';

const database = firebase.database();

export async function create(userId: string, platformName: string, platformId: string) {
    const userToPlatform = {
        userId,
        platformName,
        platformId
    };
    return database.ref(COLLECTION_BASE_ROUTE).push(userToPlatform);
}

export function get() {
    return database.ref(COLLECTION_BASE_ROUTE).once('value').then(snapshot=>snapshot.val());
}

export function getUserToPlatform(userToPlatformId: string) {
    return database.ref(`${COLLECTION_BASE_ROUTE}/${userToPlatformId}`).once('value').then(snapshot=>snapshot.val());
}

export async function getByUserId(userId: string) {
    const userToPLatformsWithSpecificUserId = database.ref(`${COLLECTION_BASE_ROUTE}`).orderByChild("userId").equalTo(userId);
    const usersToPlatforms = await userToPLatformsWithSpecificUserId.once('value').then(snapshot => snapshot.val());
    const usersToPlatformsArray = _.map(Object.keys(usersToPlatforms), key => usersToPlatforms[key]);
    if(usersToPlatformsArray.length>0){
        return _.reduce(usersToPlatformsArray,(result,userToPlatform)=>{
            result[userToPlatform.platformName]=userToPlatform;
            return result;
        }, {});
    }
    return undefined;
}

export async function getByPlatformId(platformId: string) {
    const userswithSpecificPlatformIdRef = database.ref(`${COLLECTION_BASE_ROUTE}`).orderByChild("platformId").equalTo(platformId);
    const users = await userswithSpecificPlatformIdRef.once('value').then(snapshot => snapshot.val());
    if(!users){
        return undefined;
    }
    const usersArray = _.map(Object.keys(users), key => users[key]);
    return usersArray.length > 0 ? _.first(usersArray) : undefined;
}