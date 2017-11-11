// @flow

import passport from "passport";
import session from "express-session";

export const usePassportMiddleware=(app)=>{
    app.use(session({
        secret: 'this is my secret',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
};


export function authenticationMiddleware () {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/')
    }
}