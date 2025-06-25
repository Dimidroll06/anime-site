const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/ping', (req, res) => {
    res.send('pong!');
});

module.exports = app;
