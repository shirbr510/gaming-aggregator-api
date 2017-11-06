const firebase = require("firebase");

const database = firebase.database();

function createUser(userId, username, email) {
    const user ={
        username,
        email
    };
    database.ref(`users/${userId}`).set(user);
}
const users = {
  createUser
};

module.exports= users;
