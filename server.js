const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'brandonmountan1@gmail.com',
    // MySQL password
    password: 'EiH.j6&UT4~$AS$',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

inquirer
  .prompt([
    {
    type: 'list',
    name: 'choiceList',
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

// Query database
db.query('SELECT * FROM students', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
