const mysql = require('mysql');

const mysqlCon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "JazzBass123!",
    database: "ad",
    multipleStatements: true
  });
  
  mysqlCon.connect((err) => {
    if (!err) console.log("Connected!");
    else console.log("Connection failed");
  });
  
  module.exports = mysqlCon;