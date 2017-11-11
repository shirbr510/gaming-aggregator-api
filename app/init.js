// @flow

require('../config/init');
require('./database/init');
require('./authentication/init');

import express from "express";
import passport from "passport";
import session from "express-session";

const app = express();
app.use(session({
    secret: 'this is my secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

