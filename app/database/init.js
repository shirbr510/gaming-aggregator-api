const firebase = require("firebase");
firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    console.log(error)
});