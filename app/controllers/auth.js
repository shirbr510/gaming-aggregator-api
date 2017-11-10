// @flow

import passport from "passport";

export const localAuth=passport.authenticate('local');

export const localAuthCallback=(request, response) => {
    response.redirect('/');
};

