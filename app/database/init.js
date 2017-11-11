// @flow

import * as firebase from 'firebase'

// Initialize Firebase
const {FIREBASE_API_KEY,FIREBASE_AUTH_DOMAIN,FIREBASE_DB_ENDPOINT} = process.env;
const config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DB_ENDPOINT,
};
firebase.initializeApp(config);

firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    console.log(error)
});