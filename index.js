
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
import errorHandler from "./app/middlewares/errorHandler";
import "./app/init";
import {usePassportMiddleware} from './app/authentication/middleware';
import routes from './app/routes';
import * as scheduler from './app/scheduler';


app.use(cookieParser());
app.use(bodyParser.json());

usePassportMiddleware(app);

app.use('/api',routes);

app.use(errorHandler);

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
});

scheduler.startAll();