
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
import errorHandler from "./app/middlewares/errorHandler";
import "./app/init";
import routes from './app/routes';


app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api',routes);

app.use(errorHandler);

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
});