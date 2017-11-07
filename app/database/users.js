const firebase = require("firebase");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const COLLECTION_BASE_ROUTE = '/users';

const database = firebase.database();

function createUser(username, email, password) {
    return bcrypt.genSalt(saltRounds).then(salt => {
        bcrypt.hash(password, salt).then(passwordHash => {
            const user = {
                username,
                email,
                password: passwordHash
            };
            database.ref(COLLECTION_BASE_ROUTE).push(user);
        })
    });
}

function get() {
    return database.ref(COLLECTION_BASE_ROUTE).once('value').then(snapshot=>snapshot.val());
}

function getUser(userId) {
    return database.ref(`${COLLECTION_BASE_ROUTE}/${userId}`).once('value').then(snapshot=>snapshot.val());
}

const users = {
    createUser,
    getUser,
    get
};

module.exports = users;
