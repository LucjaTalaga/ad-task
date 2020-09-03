const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const mysql = require('mysql');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "JazzBass123!",
  database: "ad",
  multipleStatements: true
});

con.connect((err) => {
  if (!err) console.log("Connected!");
  else console.log("Connection failed");
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);