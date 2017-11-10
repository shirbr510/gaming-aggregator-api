// @flow

import {getUserByEmail} from "../database/users";

const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },(email, password, done) => {
        getUserByEmail(email).then(user=> {
            // User not found
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }

            // Always use hashed passwords and fixed time comparison
            bcrypt.compare(password, user.password, (err, isValid) => {
                if (err) {
                    return done(err)
                }
                if (!isValid) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user)
            })
        })
            .catch(err=>done(err))
    }
));