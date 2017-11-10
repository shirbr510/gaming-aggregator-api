import * as firebase from 'firebase'

firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    console.log(error)
});