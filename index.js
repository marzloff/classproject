var express = require('express');
const path = require('path');
var app = express();

const { Client } = require('pg');
const connectionString = 'postgressql://projectuser:projectpassword@postgres:5432/classproject';
const client = new Client({
    connectionString: connectionString
});
client.connect();

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.send('{ "response": "Hello From Thetips4you" }');
});

app.get('/will', function (req, res) {
    res.send('{ "response": "Hello World" }');
});
app.get('/ready', function (req, res) {
    res.send('{ "response": " Great!, It works!" }');
});

app.get('/test', function (req, res) {
    res.send('{ "response": "Code test" }');
});

app.get('/app', function (req, res) {
    res.redirect('/public/apppages/app.html');
    //res.sendFile(__dirname + "/public/apppages/app.html");
});
app.get('/db', function (req, res, next) {
    client.query('SELECT * FROM employee', [], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
});

app.put('/dbadd', function (req, res, next) {
    client.query('INSERT INTO EMPLOYEE (FIRST_NAME, LAST_NAME) VALUES ($1, $2)', [req.body.first_name, req.body.last_name], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
});

app.put('/dbdelete', function (req, res, next) {
    client.query('DELETE FROM EMPLOYEE WHERE EMPLOYEE_ID = ($1)', [req.body.employee_id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
});

app.listen(process.env.PORT || 3000);

module.exports = app;
