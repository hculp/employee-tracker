# Employee Tracker

![Github License](https://img.shields.io/badge/license-ISC-red)

## Description

This is command-line application for tracking, managing, and updating departments, roles, and employees for an example company. This content management system show cases inquirer and mysql query integration. This command line based utility that prompts the user to select from a list of options. The options listed allow the user to view a selected table(s), add/update a given column(s) in a table, and remove/delete elements in a table.
When the user starts the application, they are presented with the following options:
view all employees, add emloyee, update emloyee role, update employee manager, view all roles, add role, view all departments, add department, view employees by manager, view all employees for a department, remove department, remove role, remove employee, view total department budget, and quit.

- When a user chooses to view all departments, a formatted table showing department names and ids.
- When a user chooses to view all roles, a table with job title, role id, department that belongs to that role, and salary for that role is displayed.
- When a user chooses to view all employees, a formatted table shows employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers of the employee.
- When a user chooses to add a department, they are prompted to enter a name for a department that is then added to the database.
- When a user chooses to add a role, they are prompted for the name, salary, and department for the role that's then added to the database.
- When a user chooses to add an employee, they are prompted for the employee's first name, last name, role, and manger, which is then added to the database.
- When a user chooses to update an employee's role, they are prompted to select an employee and their new role, which is then updated in the database.
- When a user chooses to update an employee's manager, they are prompted to select an employee and the other existing employee that will be their manager, which is then updated in the database.
- When a user chooses to view all employees for a department, they are prompted to select a department which returns a formatted table with all employee information joined by all role information for employees under that department.
- When a user chooses to remove a department, they are prompted for the department name, and the database removes that department and deletes all associated roles and employees under that department as well.
- When a user chooses to remove a role, they are prompted for the role name, then the role is removed from the database and the employee table is updated with null values. The employee table can then be updated to add a new role for employees after this, or the user can remove the employee, whichever the user wants.
- When a user chooses to remove an employee, they are prompted for the employee's first and last name, which then deletes the emloyee from the database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [Tests](#test)
- [Questions](#questions)
- [License](#license)

## Installation

1. To install just clone this repo:

```
git clone git@github.com:hculp/employee-tracker.git
```

2. Install the required packages (inquier, dotenv, and mysql2) from the given package.json:

```
npm i
```

3. Setup and seed the mysql database with the given schema and seeds files in the db folder. Make sure to create a .env file with variables `DB_NAME, DB_USER, DB_PASSWORD` with your mysql database info.

## Usage

To use the employee tracker, use node command:

```
npm start
```

Follow the prompts and adjust your inputs into tables as needed. **Make sure to use the id column and not the index column from the tables when asked for any department, role, manager id**

Here is a link to a demo [video](https://drive.google.com/file/d/1J31D837ESQqwGKrwwLtlB1vXiak6Nis6/view) using the command line utility.

## Contribution

Contribution falls under open ISC license.

## Tests

There are no given tests here, but you should craft them for your given use and adjustments to any base code here.

## Questions

Send any questions or feedback to the following contacts:

- GitHub: [https://github.com/hculp](https://github.com/hculp)
- Email: [howacul@gmail.com](mailto:howacul@gmail.com)

## License

    Copyright (C) 2023 Houston Culpepper.

    Distributed under the ISC License.

[Link to ISC license](https://choosealicense.com/licenses/isc)
