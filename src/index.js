const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/index')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false    }));

require('./routes/user')(app);
app.listen(3000);