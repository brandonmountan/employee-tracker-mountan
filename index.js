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
    db.query('SELECT * FROM departments', (err, rows) => {
        console.table(rows);
        loadMainPrompt();
    })
}

function viewAllRoles() {
    db.query('SELECT roles.id, roles.title, roles.salary, departments.department FROM roles JOIN departments ON roles.department_id=departments.id;', (err, rows) => {
        console.table(rows);
        loadMainPrompt();
    })
}

function viewAllEmployees() {
    db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager_id, manager.first_name FROM employees JOIN roles ON employees.role_id=roles.id JOIN departments ON roles.department_id=departments.id JOIN employees manager ON employees.id=manager.id', (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table(rows);
        loadMainPrompt();
    })
}

function addDepartment() {
    console.log('addDepartment');
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
            const sql = `INSERT INTO departments (department) VALUES (?);`
            db.query(sql, answer.departmentName, (err, rows) => {
                if (err) {
                    console.log(err)
                }
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
    loadDeptPrompt();
    // loadMainPrompt();
}



function addRole() {
    console.log('addRole');
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
                    'Sales',
                    'Human Resources',
                    'Accounting',
                    'CS Agent'
                ]
            }
        ])
        .then((answers) => {
            console.log(answers)
            let deptId;
            db.query(`SELECT id FROM departments WHERE departments.department = '${answers.roleChoice}'`, (err, rows) => {
                if (err) {
                    console.log(err)
                }
                deptId = rows[0].id;
                const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`
                const params = [answers.roleName, answers.roleSalary, deptId];
                db.query(sql, params, (err, rows) => {
                    if (err) {
                        console.log(err)
                    }
                })
            })
        })
        .catch((error) => {
            console.log(error);
        })
    };
    
    loadRolePrompt();
    // loadMainPrompt();
}



function addEmployee() {
    console.log('addEmployee');
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
                message: "What is the employee's role?",
                choices: [
                    'Salesman',
                    'HR Representative',
                    'Accountant',
                    'Student'
                ]
            },
            {
                type: 'list',
                name: 'employeeManager',
                message: "Who is the employee's manager?",
                choices: [
                    'John Doe',
                    'Jane Doe'
                ]
            }
        ])
        .then((answers) => {
            console.log(answers);
            db.query(`SELECT role_id, manager_id FROM employees WHERE employees.role_id = '${answers.employeeRole}' AND employees.manager_id = '${answers.employeeManager}'`, (err, rows) => {
            if (err) {
                console.log(err)
            }
            console.log(rows)
            let roleId;
            let managerId;
            roleId = rows[0].role_id;
            managerId = rows[0].managerId;
            const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
            const params = [answers.firstName, answers.lastName, roleId, managerId];
            db.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err)
                }
            })
            })
            })
        .catch((err) => {
            console.log(err)
        })
    }
    loadEmployeePrompt();
    // loadMainPrompt();
}

function quit() {
    console.log('quit');
    loadMainPrompt();
}

init();