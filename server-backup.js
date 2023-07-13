const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');
require('dotenv').config();
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '3nterPr!se96',
    database: 'employees_db'
  },
);

function init() {
inquirer
  .prompt([
    {
    type: 'list',
    name: 'choiceList',
    message: 'What would you like to do?',
    choices: [ 
            'view all departments',
            'view all roles',
            'view all employees',
            'add a department',
            'add a role',
            'add an employee',
            'update an employee role',
            'quit',
            ]
    }
  ])
  .then((answer) => {
    console.log(answer);
    switch (answer) {
      case 'view all departments':
        console.log('success');
        app.get('/departments', (req, res) => {
          const values = [
            ['Math', 1]
          ];

          db.query(sql, (err, rows) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            console.table(['Department', 'Department ID'], values)
          });
        });
        break;
      case 'view all roles':
        console.log('success');
        app.get('/roles', (req, res) => {
          const values = [
            ['Professor', 5, 'Math', 100000]
          ];

          db.query(sql, (err, rows) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            console.table(['job title', 'role id', 'department', 'salary'], values)
          });
        });
        break;
      case 'view all employees':
        app.get('/employees', (req, res) => {
          const values = [
            [9, 'John', 'Doe', 'Professor', 'Math', 100000, 9]
          ];

          db.query(sql, (err, rows) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            console.table(['employee id', 'first name', 'last name', 'job title', 'department', 'salary', 'manager'], values);
          });
        });
        break;
      case 'add a department':
        app.post('/new-department', ({ body }, res) => {
          const sql = `INSERT INTO department (department) VALUES (?)`;
          const params = [body.department];
          db.query(sql, params, (err, result) => {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          res.json({
            message: 'success',
            data: body
          });
        });
      });
        break;
      case 'add a role':
        app.post('/new-role', ({ body }, res) => {
          const sql = `INSERT INTO role (title, salary, department) VALUES (?)`;
          const params = [body.title, body.salary, body.department];

          db.query(sql, params, (err, result) => {
            if (err) {
              res.status(400).json({ error: err.message });
              return;
            }
            res.json({
              message: 'success',
              data: body
            });
          });
        });
        break;
      case 'add an employee':
        app.post('/new-employee', ({ body }, res) => {
          const sql = `INSERT INTO employee (first_name, last_name, title, manager)`;
          const params = [body.first_name, body.last_name, body.title, body.manager];

          db.query(sql, params, (err, result) => {
            if (err) {
              res.status(400).json({ error: err.message });
              return;
            }
            res.json({
              message: 'success',
              data: body
            });
          });
        });
        break;
      case 'quit':
        return;
        break;
    };
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(error)
    } else {
      console.log('success')
    }
  });
}

init();

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
