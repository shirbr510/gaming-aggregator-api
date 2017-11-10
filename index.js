import "./app/init";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

import routes from './app/routes';

app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.send('Hello from Express!')
});

app.use('/api',routes);

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