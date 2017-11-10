//init dotenv
require('dotenv').config();

import * as firebase from 'firebase'

// Initialize Firebase
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_ENDPOINT,
};
firebase.initializeApp(config);

require('./database/init');