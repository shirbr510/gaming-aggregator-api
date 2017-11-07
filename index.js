require('./app/init');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const users = require("./app/database/users");

app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.send('Hello from Express!')
});

app.post('/users', (request, response) => {
    const {username,email,password} = request.body;
    users.createUser(username,email,password)
        .then(()=>response.send('User Created!'))
        .catch(()=>response.send('Something went wrong!'));

});

app.get('/users', (request, response) => {
    users.get().then(users=>{
        response.send(users);
    });
});

app.get('/users/:id', (request, response) => {
    const {id} = request.params;
    users.getUser(id).then(user=>{
        response.send(user);
    });
});

app.use((err, request, response, next) => {
    // log the error, for now just console.log
    console.log(err);
    response.status(500).send('Something broke!')
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
});