const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  // MySQL username,
  user: "root",
  // MySQL password
  password: "",
  database: "employees_db",
});

function init() {
    loadMainPrompt();
};

function loadMainPrompt() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'choice',
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
        switch (answer.choice) {
            case 'view all departments':
                viewAllDepartments();
                break;
            case 'view all roles':
                viewAllRoles();
                break;
            case 'view all employees':
                viewAllEmployees();
                break;
            case 'add a department':
                addDepartment();
                break;
            case 'add a role':
                addRole();
                break;
            case 'add an employee':
                addEmployee();
                break;
            case 'update an employee role':
                updateEmployeeRole();
                break;
            default:
                quit();
        }
    })
}

function viewAllDepartments() {
    console.log('viewAllDepartments');
    db.query('SELECT * FROM department', (err, rows) => {
        console.table(rows)
    })
    loadMainPrompt()
}

function viewAllRoles() {
    console.log('viewAllRoles');
    db.query('SELECT role.id, role.title, role.salary, department.name FROM role JOIN department ON role.department_id=department.id;', (err, rows) => {
        console.table(rows)
    })
    loadMainPrompt()
}

function viewAllEmployees() {
    console.log('viewAllEmployees');
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM employee ON JOIN role JOIN department;', (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table(rows)
    })
    loadMainPrompt()
}

function loadDeptPrompt() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Please enter department name',
        }
    ])
    .then((answer) => {
        console.log(answer.departmentName);
        db.query(`INSERT INTO department (name) VALUES (${answer.departmentName});`, (err, rows) => {
            if (err) {
                console.log(err)
            }
        })
    })
    .catch((error) => {
        console.log(error)
    })
}

function addDepartment() {
    console.log('addDepartment');
    loadDeptPrompt();
    // loadMainPrompt();
}


function loadRolePrompt() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'list',
            name: 'roleChoice',
            message: 'Which department does the role belong to?',
            choices: [
                'Math',
                'English',
                'Science',
                'History'
            ]
        }
    ])
};

function addRole() {
    console.log('addRole');
    loadRolePrompt();
    // loadMainPrompt();
}

function loadEmployeePrompt() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?"
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: "What is the employee's role?"
        }
    ])
}

function addEmployee() {
    console.log('addEmployee');
    loadMainPrompt();
}

function quit() {
    console.log('quit');
    loadMainPrompt();
}

init();