// @flow

import * as firebase from 'firebase'
import * as _ from 'lodash';

const saltRounds = 10;
const COLLECTION_BASE_ROUTE = '/steam-games';

const database = firebase.database();

export async function setUserSteamGames(userId: string, games: Array<Object>) {
    return database.ref(`${COLLECTION_BASE_ROUTE}/${userId}`).set(games);
}

export function get() {
    return database.ref(COLLECTION_BASE_ROUTE).once('value').then(snapshot=>snapshot.val());
}

export function getGamesByUserId(userId: string) {
    return database.ref(`${COLLECTION_BASE_ROUTE}/${userId}`).once('value').then(snapshot=>snapshot.val());
}