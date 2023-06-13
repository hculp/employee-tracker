const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./config/connection');

function startPrompt() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'menu',
                message: 'What would you like to do',
                choices: [
                    'View all Employees',
                    'Add Employee',
                    'Update Employee Role',
                    'Update Employee Manager',
                    'View All Roles',
                    'Add Role',
                    'View All Departments',
                    'Add Department',
                    'View Employees by Manager',
                    'View ALL Employees for a Department',
                    'Remove Department',
                    'Remove Role',
                    'Remove Employee',
                    'View Total Department Budget',
                    "Quit",
                    new inquirer.Separator()
                ]
            },
        ])
        .then( async (starter) => {
            await userSelection(starter.menu);
            // res.select === 'Quit' ? process.exit() : startPrompt();
        })
        .catch((err) => {
            if (err.isTtyError) {
            } else {
                err;
            }
        });
};

function userSelection(selection) {
    try {
        console.log(selection);
        switch(selection) {
            case 'View all Employees':
                db.query(`SELECT
                    employee.first_name,
                    employee.last_name,
                    role.title AS title,
                    department.name AS department,
                    role.salary AS salary,
                    CASE WHEN employee.manager_id IS NOT NULL THEN CONCAT(manager_table.first_name,' ', manager_table.last_name) ELSE NULL END AS manager
                    FROM employee
                    JOIN role ON employee.role_id = role.id
                    JOIN department ON role.department_id = department.id
                    LEFT JOIN employee manager_table ON employee.manager_id = manager_table.id`, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(result);
                    startPrompt();
                });
                break;
            case 'Add Employee':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: `Enter Employee's first name`,
                        validate(value) {
                            if (value) return true;
                            else {
                                console.log('Please enter a name');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: `Enter Employee's last name`,
                        validate(value) {
                            if (value) return true;
                            else {
                                console.log('Please enter a name');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'role',
                        message: `Enter Employee's role or add later`,
                    },
                    {
                        type: 'input',
                        name: 'manager',
                        message: `Enter Employee's manager or leave empty if none`,
                    }
                ]).then(async (answers) => {
                    await db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                            VALUES (?, ?, ?, ?')`, [answers.first_name, answers.last_name, answers.role, answers.manager], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`Added ${answers.first_name} ${answers.last_name} to employee database`);
                    startPrompt();
                })
                });
            case 'Quit':
                process.exit();
                break;
        }
    } catch (err) {
        console.log(err)
    }
};

startPrompt();
