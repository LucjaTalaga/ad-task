const express = require('express');
const bodyParser = require('body-parser');
const mysqlCon = require('./connection');
const bcrypt = require('bcrypt');
const session = require('express-session');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.json());
app.use(pino);
app.use(session({
  secret: 'mouse dog',
  resave: false,
  saveUninitialized: true
}));

app.get('/home', (req, res) => {
  const session = req.session.name;
  const isLogged = session ? true : false;
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ isLogged: isLogged, session: session }));
});

app.post('/register', (req, res) => {
  const {name, password} = req.body;
  const sql = 'SELECT name FROM users WHERE name = ?';
  mysqlCon.query(sql, [name], async (err, rows, fields) => {
    if (err) throw err;
    if (rows.length > 0) {
      res.status(406).send("username taken");
    }
    else {
      try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const sqlInsert = 'INSERT INTO users (name, password) VALUES (?,?)';
        mysqlCon.query(sqlInsert, [name, hashedPassword], (err, rows, fields) => {
          if (err) throw err;  
        });
        req.session.name = name;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ name: name}));
      }
      catch {
        res.status(500).send("bcrypt error");  
      }
    }
  });
});

app.post('/login', async (req, res) => {
  const {name, password} = req.body;
  const sql = 'SELECT name, password FROM users WHERE name = ?';
  mysqlCon.query(sql, [name], async (err, rows, fields) => {
    if (err) throw err;
    if (rows.length > 0){
      try{
        const compare = await bcrypt.compare(password,rows[0].password);
        if (compare){
          req.session.name = name;
          res.setHeader('Content-Type', 'application/json');
          res.status(200).send(JSON.stringify({ name: name}));
        }
        else {
          res.status(400).send("wrong password");
        }
      }
      catch {
        res.status(500).send("bcrypt error");
      }
    }
    else{
      res.status(400).send("wrong username");
    }
  });
});

app.get('/logout', (req, res) => {
  if (req.session.name){
    try{
      req.session.destroy();
      res.send(JSON.stringify({ mssg: 'logged out' }));
      }
    catch {
      res.send(JSON.stringify({ mssg: 'error' }))
    }
  }
  else {
    res.send(JSON.stringify({ mssg: 'redirect' }))
  }
});

app.post('/add', (req, res) => {
  const {add} = req.body;
  const name = req.session.name;
  if(name && add.length > 0){
    const sql = 'SELECT id FROM users WHERE name = ?';
    mysqlCon.query(sql, [name], (err, rows, fields) => {
      if (err) throw err;
      const id = rows[0].id;
      try{
        const insertSql = 'INSERT INTO tasks (user_id, task) VALUES (?,?)';
        mysqlCon.query(insertSql, [id, add], (err, rows, fields) => {
          if (err) {
            res.status(400).send('Only english signs are accepted');        
          }
          else{ 
          res.status(200).send(JSON.stringify({ mssg: 'added'}));
          }
        });
      }
      catch (err){
        res.status(400).send('Only english signs are accepted');
      }
    });
  }
  else {
    res.status(500).send('user logged out');  
  }
  });

app.get('/get', (req, res) => {
  const name = req.session.name;
  if(name){
    const sql = 'SELECT id FROM users WHERE name = ?';
    mysqlCon.query(sql, [name], (err, rows, fields) => {
      if (err) throw err;
      const id = rows[0].id;
      const tasksSql = 'SELECT task FROM tasks WHERE user_id = ?';
      mysqlCon.query(tasksSql, [id], (err, rows, fields) => {
        if (err) throw err;
        const tasks = [];
        for (let i = 0; i < rows.length; i++){
          tasks.push(rows[i].task);
        }
        res.status(200).send(JSON.stringify({ tasks: tasks}));
      });
    });
  }
  else {
    res.status(500).send('user logged out');
  }
});

app.delete('/get', (req, res) => {
  const {task} = req.body;
  const name = req.session.name;
  if(name){
    const sql = 'SELECT id FROM users WHERE name = ?';
    mysqlCon.query(sql, [name], (err, rows, fields) => {
      if (err) throw err;
      const id = rows[0].id;
      const deleteSql = 'DELETE FROM tasks WHERE user_id = ? AND task = ? LIMIT 1';
      mysqlCon.query(deleteSql, [id, task], (err, rows, fields) => {
        if (err) throw err;
        res.status(200).end();
      });
    });
  }  
  else {
    res.status(500).send('user logged out');
    }
});

app.listen(3001, () => 
  console.log('Express server is running on localhost:3001')
);