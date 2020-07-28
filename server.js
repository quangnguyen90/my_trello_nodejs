const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const taskRouter = require('./routers/Task');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// static files
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/tasks', taskRouter);

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(3000);