const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config = require('./lib/config');
const routes = require('./routes/index');
const app = express();

app.use(cors({
    origin: '*'
}));
app.use(cookieParser(config.cookieSecret));

app.use(express.json());
app.use(express.urlencoded());

app.use('/api', routes);

module.exports = app;
