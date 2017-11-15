// @flow

import * as users from "../database/users";

export const getAllUsers=(request, response) => {
    users.getUsers().then(users => {
        response.send(users);
    });
};

export const getUser=(request, response) => {
    const {id} = request.params;
    users.getUser(id).then(user=>{
        response.send(user);
    });
};

export const createUser=(request, response) => {
    const {username,email,password} = request.body;
    users.createUser(username,email,password)
        .then(()=>response.send('User Created!'))
        .catch(()=>response.send('Something went wrong!'));
};
