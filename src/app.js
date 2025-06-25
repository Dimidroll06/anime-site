const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressWinston = require('express-winston');
const { logger } = require('./lib/logger');
const config = require('./lib/config');
const routes = require('./routes/index');
const app = express();

app.use(expressWinston.logger({
    winstonInstance: logger
}));

app.use(cors({
    origin: '*'
}));
app.use(cookieParser(config.cookieSecret));

app.use(express.json());
app.use(express.urlencoded());

app.use('/api', routes);

app.use(expressWinston.errorLogger({
    winstonInstance: logger
}));

module.exports = app;
