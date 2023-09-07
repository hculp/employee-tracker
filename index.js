const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
const db = require("./config/connection");

function startPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "What would you like to do",
        choices: [
          "View all Employees",
          "Add Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "View Employees by Manager",
          "View All Employees for a Department",
          "Remove Department",
          "Remove Role",
          "Remove Employee",
          "View Total Department Budget",
          "Quit",
          new inquirer.Separator(),
        ],
      },
    ])
    .then(async (starter) => {
      await userSelection(starter.menu);
    })
    .catch((err) => {
      if (err.isTtyError) {
      } else {
        err;
      }
    });
}

async function userSelection(selection) {
  try {
    switch (selection) {
      case "View all Employees":
        db.query(
          `SELECT
                    employee.id AS id,
                    employee.first_name,
                    employee.last_name,
                    role.title AS title,
                    department.name AS department,
                    role.salary AS salary,
                    CASE WHEN employee.manager_id IS NOT NULL THEN CONCAT(manager_table.first_name,' ', manager_table.last_name) ELSE NULL END AS manager
                    FROM employee
                    JOIN role ON employee.role_id = role.id
                    JOIN department ON role.department_id = department.id
                    LEFT JOIN employee manager_table ON employee.manager_id = manager_table.id
                    ORDER BY employee.id ASC`,
          (err, result) => {
            if (err) {
              console.log(err);
            }
            console.table(result);
            startPrompt();
          }
        );
        break;
      case "Add Employee":
        await inquirer
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: `Enter Employee's first name:`,
              validate(value) {
                if (value) return true;
                else {
                  console.log("Please enter a name");
                  return false;
                }
              },
            },
            {
              type: "input",
              name: "last_name",
              message: `Enter Employee's last name:`,
              validate(value) {
                if (value) return true;
                else {
                  console.log("Please enter a name");
                  return false;
                }
              },
            },
            {
              type: "input",
              name: "role",
              message: `Enter Employee's role(must be the an integer from the role table):`,
              validate(value) {
                if (value) return true;
                else {
                  console.log("Please enter a role");
                  return false;
                }
              },
            },
            {
              type: "input",
              name: "manager",
              message: `Enter Employee's manager(must be the an integer from the employee table):`,
              validate(value) {
                if (value) {
                  return true;
                } else {
                  console.log("Please enter a name");
                  return false;
                }
              },
            },
          ])
          .then(async (answers) => {
            db.query(
              `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
              [
                answers.first_name,
                answers.last_name,
                answers.role,
                answers.manager,
              ],
              (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(
                    `Added ${answers.first_name} ${answers.last_name} to employee database`
                  );
                  startPrompt();
                }
              }
            );
          });
        break;
      case "Update Employee Role":
        await inquirer
          .prompt([
            {
              type: "input",
              name: "employee",
              message: `Enter Employee's first name:`,
              validate(value) {
                if (value) return true;
                else {
                  console.log("Please enter a name");
                  return false;
                }
              },
            },
            {
              type: "input",
              name: "role",
              message: `Enter Employee's new role:`,
            },
          ])
          .then(async (answers) => {
            db.query(
              `UPDATE employee SET role_id = ? WHERE first_name = ?`,
              [answers.role, answers.employee],
              (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(
                    `Updated ${answers.employee}'s role to ${answers.role}`
                  );
                  startPrompt();
                }
              }
            );
          });
        break;
      case "Update Employee Manager":
        await inquirer
          .prompt([
            {
              type: "input",
              name: "employee",
              message: `Enter Employee's first name:`,
              validate(value) {
                if (value) return true;
                else {
                  console.log("Please enter a name");
                  return false;
                }
              },
            },
            {
              type: "input",
              name: "manager",
              message: `Enter Employee's new manager:`,
            },
          ])
          .then(async (answers) => {
            db.query(
              `UPDATE employee SET manager_id = ? WHERE first_name = ?`,
              [answers.manager, answers.employee],
              (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(
                    `Updated ${answers.employee}'s manager to ${answers.manager}`
                  );
                  startPrompt();
                }
              }
            );
          });
        break;
      case "View All Roles":
        db.query(
          `SELECT
                    role.id AS id,
                    role.title AS title,
                    department.name AS department,
                    role.salary AS salary
                    FROM role
                    JOIN department ON role.department_id = department.id
                    ORDER BY role.id ASC`,
          (err, result) => {
            if (err) {
              console.log(err);
            }
            console.table(result);
            startPrompt();
          }
        );
        break;
      case "Add Role":
        await inquirer
          .prompt([
            {
              type: "input",
              name: "title",
              message: `Enter Role's title:`,
              validate(value) {
                if (value) return true;
                else {
                  console.log("Please enter a title");
                  return false;
                }
              },
            },
            {
              type: "input",
              name: "salary",
              message: `Enter Role's salary:`,
            },
            {
              type: "input",
              name: "department",
              message: `Enter Role's department id:`,
            },
          ])
          .then(async (answers) => {
            db.query(
              `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
              [answers.title, answers.salary, answers.department],
              (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Added ${answers.title} to role database`);
                  startPrompt();
                }
              }
            );
          });
        break;
      case "View All Departments":
        db.query(
          `SELECT
                    department.id AS id,
                    department.name AS department
                    FROM department
                    ORDER BY department.id ASC`,
          (err, result) => {
            if (err) {
              console.log(err);
            }
            console.table(result);
            startPrompt();
          }
        );
        break;
      case "Add Department":
        await inquirer
          .prompt([
            {
              type: "input",
              name: "department",
              message: `Enter Department's name:`,
              validate(value) {
                if (value) return true;
                else {
                  console.log("Please enter a name");
                  return false;
                }
              },
            },
          ])
          .then(async (answers) => {
            db.query(
              `INSERT INTO department (name) VALUES (?)`,
              [answers.department],
              (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(
                    `Added ${answers.department} to department database`
                  );
                  startPrompt();
                }
              }
            );
          });
        break;
      case "View Employees by Manager":
        await inquirer
          .prompt([
            {
              type: "input",
              name: "manager",
              message: `Enter Manager's first name:`,
              validate(value) {
                if (value) return true;
                else {
                  console.log("Please enter a name");
                  return false;
                }
              },
            },
          ])
          .then(async (answers) => {
            db.query(
              `SELECT
                            employee.first_name,
                            employee.last_name,
                            role.title AS title,
                            department.name AS department,
                            role.salary AS salary,
                            CASE WHEN employee.manager_id IS NOT NULL THEN CONCAT(manager_table.first_name,' ', manager_table.last_name) ELSE NULL END AS manager
                            FROM employee
                            JOIN role ON employee.role_id = role.id
                            JOIN department ON role.department_id = department.id
                            LEFT JOIN employee manager_table ON employee.manager_id = manager_table.id
                            WHERE manager_table.first_name = ?`,
              [answers.manager],
              (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.table(result);
                startPrompt();
              }
            );
          });
        break;
      case "View All Employees for a Department":
        await inquirer
          .prompt([
            {
              type: "input",
              name: "department",
              message: `Enter Department's name:`,
              validate(value) {
                if (value) return true;
                else {
                  console.log("Please enter a name");
                  return false;
                }
              },
            },
          ])
          .then(async (answers) => {
            db.query(
              `SELECT
                            employee.id AS id,
                            employee.first_name,
                            employee.last_name,
                            role.title AS title,
                            department.name AS department,
                            role.salary AS salary,
                            CASE WHEN employee.manager_id IS NOT NULL THEN CONCAT(manager_table.first_name,' ', manager_table.last_name) ELSE NULL END AS manager
                            FROM employee
                            JOIN role ON employee.role_id = role.id
                            JOIN department ON role.department_id = department.id
                            LEFT JOIN employee manager_table ON employee.manager_id = manager_table.id
                            WHERE department.name = ?
                            ORDER BY employee.id ASC`,
              [answers.department],
              (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.table(result);
                startPrompt();
              }
            );
          });
        break;
      case "Remove Department":
        await inquirer
          .prompt([
            {
              type: "input",
              name: "department",
              message: `Enter Department's name:`,
              validate(value) {
                if (value) return true;
                else {
                  console.log("Please enter a name");
                  return false;
                }
              },
            },
          ])
          .then(async (answers) => {
            db.query(
              `DELETE FROM department WHERE name = ?`,
              [answers.department],
              (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(
                    `Removed ${answers.department} from department database`
                  );
                  startPrompt();
                }
              }
            );
          });
        break;
      case "Remove Role":
        await inquirer
          .prompt([
            {
              type: "input",
              name: "role",
              message: `Enter Role's title:`,
              validate(value) {
                if (value) return true;
                else {
                  console.log("Please enter a title");
                  return false;
                }
              },
            },
          ])
          .then(async (answers) => {
            db.query(
              `DELETE FROM role WHERE title = ?`,
              [answers.role],
              (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Removed ${answers.role} from role database`);
                  startPrompt();
                }
              }
            );
          });
        break;
      case "Remove Employee":
        await inquirer
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: `Enter Employee's first name:`,
              validate(value) {
                if (value) return true;
                else {
                  console.log("Please enter a name");
                  return false;
                }
              },
            },
            {
              type: "input",
              name: "last_name",
              message: `Enter Employee's last name:`,
              validate(value) {
                if (value) return true;
                else {
                  console.log("Please enter a name");
                  return false;
                }
              },
            },
          ])
          .then(async (answers) => {
            db.query(
              `DELETE FROM employee WHERE first_name = ? AND last_name = ?`,
              [answers.first_name, answers.last_name],
              (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(
                    `Removed ${answers.first_name} ${answers.last_name} from employee database`
                  );
                  startPrompt();
                }
              }
            );
          });
        break;
      case "View Total Department Budget":
        await inquirer
          .prompt([
            {
              type: "input",
              name: "department",
              message: `Enter Department's name:`,
              validate(value) {
                if (value) return true;
                else {
                  console.log("Please enter a name");
                  return false;
                }
              },
            },
          ])
          .then(async (answers) => {
            db.query(
              `SELECT
                            department.name AS department,
                            SUM(role.salary) AS budget
                            FROM employee
                            JOIN role ON employee.role_id = role.id
                            JOIN department ON role.department_id = department.id
                            WHERE department.name = ?`,
              [answers.department],
              (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.table(result);
                startPrompt();
              }
            );
          });
        break;
      case "Quit":
        process.exit();
    }
  } catch (err) {
    console.log(err);
  }
}

startPrompt();
