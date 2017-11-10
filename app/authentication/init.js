// @flow

import {getUserByEmail} from "../database/users";

const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const user = {
    username: 'test-user',
    passwordHash: 'bcrypt-hashed-password',
    id: 1
};

passport.use(new LocalStrategy(
    (username, password, done) => {
        getUserByEmail(email).then(user=> {
            // User not found
            if (!user) {
                return done(null, false)
            }

            // Always use hashed passwords and fixed time comparison
            bcrypt.compare(password, user.password, (err, isValid) => {
                if (err) {
                    return done(err)
                }
                if (!isValid) {
                    return done(null, false)
                }
                return done(null, user)
            })
        })
            .catch(err=>done(err))
    }
));