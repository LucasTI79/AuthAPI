const express = require('express');

const bodyparser = require('body-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

require('./Controllers/authControler')(app);

app.listen(3000);