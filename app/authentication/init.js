// @flow

import {getUserByEmail, getUserByPlatformId} from "../database/users";

const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const SteamStrategy = require('passport-steam').Strategy;

const {STEAM_API_KEY} = process.env;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, done) => {
        getUserByEmail(email)
            .then(user => {
                // User not found
                if (!user) {
                    return done(null, false, {message: 'Incorrect email.'});
                }

                // Always use hashed passwords and fixed time comparison
                bcrypt.compare(password, user.password, (err, isValid) => {
                    if (err) {
                        return done(err)
                    }
                    if (!isValid) {
                        return done(null, false, {message: 'Incorrect password.'});
                    }
                    return done(null, user)
                })
            })
            .catch(err => done(err))
    }
));

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:3000/api/auth/steam/return',
    realm: 'http://localhost:3000/',
    apiKey: STEAM_API_KEY
  },(identifier, profile, done) => {
    getUserByPlatformId(identifier)
    .then(user => {
        // User not found
        if (user) {
            return done(null, user)
        }

        //TODO: create user
        return done(null, false, {message: 'User does not exist'});
        })
    .catch(err => done(err))
  }
));