// const express = require('express')
// const bodyParser = require('body-parser')

import express from 'express';
import bodyParser from 'body-parser'
import path from 'path'

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get('/', function (req, res) {
    res.send({express: 'hello'});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
