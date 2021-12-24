const config = require("./config/config")
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const db = mysql.createConnection({
    host: config.host,
    port: config.port,
    password: config.password,
    user: config.user,
    database: config.database,
});
console.log(`Connected to the employees database.`);
function init() {
    inquirer.prompt({
        type: "list",
        name: "ChoosingOptions",
        message: "===============================================\n  ****  Welcome to the Employee Traker app.  ****\n  ****  What would you like to do today?     **** \n  =============================================== \n",

        choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add a role', 'Add an employee', 'Update  Manager', 'Delete', 'Quit']
    }).then(function (selectedAnswer) {
        if (selectedAnswer.ChoosingOptions === "View all departments") {

            db.connect(function (err) {
                if (err) throw err;
                db.query('select * from departments', function (err, result) {
                    if (err) throw err;
                    console.log("\n");
                    console.table(result);
                });
            })
            inquirer.prompt({

                
                // add table HERE for departments BY NAME AND ID
                type: 'list',
                name: 'ChoosingOptions',
                message: "Here are all departments \n  Press enter to go to the main menu plase",
                choices: ['Go to the main menu']
            } ).then(function (selectedAnswer) {
               
                if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                    init();
                }
            })

        } else if (selectedAnswer.ChoosingOptions === "View all roles") {
            db.connect(function (err) {
                if (err) throw err;
                db.query('select * from roles', function (err, result) {
                    if (err) throw err;
                    console.log("\n");
                    console.table(result);
                });
            })

            inquirer.prompt({
                // add table HERE for all roles presented with the job title, role id, the department that role belongs to, and the salary for that role
                type: 'list',
                name: 'ChoosingOptions',
                message: "Here are all the roles \n  Press enter to go to the main menu plase",
                choices: ['Go to the main menu']
            }).then(function (selectedAnswer) {
                if (selectedAnswer.ChoosingOptions === "Go to the main menu") {

                    init();
                };
            });

        } else if (selectedAnswer.ChoosingOptions === "View all employees") {
            // add table HERE for all employees presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
            db.connect(function (err) {
                if (err) throw err;
                db.query('select * from employee', function (err, result) {
                    if (err) throw err;
                    console.log("\n");
                    console.table(result);
                });
            })
            inquirer.prompt({
                
                type: 'list',
                name: 'ChoosingOptions',
                message: "Here are all the employees \n  Press enter to go to the main menu plase",
                choices: ['Go to the main menu']
            }).then(function (selectedAnswer) {
                if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                    init();
                };
            });
        } else if (selectedAnswer.ChoosingOptions === "Add department") {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'nameOfDepartment',
                    message: "Give a name to the department you want to add",

                },
                {
                    type: 'input',
                    name: 'idOfDepartment',
                    message: "Give an ID to the department you want to add",
                },
                {
                    type: 'list',
                    name: 'ChoosingOptions',
                    message: "You added a deparment successfuly \n  Press enter to go to the main menu plase",
                    choices: ['Go to the main menu']
                }
            ])
                // add department here prompted to enter the name of the department and that department is added to the database
                .then(function (selectedAnswer) {
                    db.connect(function (err) {
                        if (err) throw err;
                        db.query('INSERT INTO departments SET ?',{department_name: selectedAnswer.nameOfDepartment}, function (err, result) {
                            if (err) throw err;
                            console.log("\n");
                            // console.table(result);
                        });
                    })
                    if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                        init();


                    };
                })


        } else if (selectedAnswer.ChoosingOptions === "Add a role") {
            inquirer.prompt([
                //  ================   adding role =============

                {
                    type: 'input',
                    name: 'tilteOfRole',
                    message: "Give a name to the role you want to add",

                },
                {
                    type: 'input',
                    name: 'salaryOfRole',
                    message: "What is the salary amount for the role you want to add?",

                },
                {
                    type: 'input',
                    name: 'idOfDepartment',
                    message: "What is the ID of the department in which this role is beig added to?",

                },
                {
                    type: 'list',
                    name: 'ChoosingOptions',
                    message: "You added a role successfuly \n  Press enter to go to the main menu plase",
                    choices: ['Go to the main menu']
                }
            ]).then(function (selectedAnswer) {
                if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                    init();


                };
            });
        } else if (selectedAnswer.ChoosingOptions === "Add an employee") {
            //  =============== adding employee ==============
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'employeeName',
                    message: "What is the name of the employee you want to add?",

                },
                {
                    type: 'input',
                    name: 'employeeLastName',
                    message: "What is the last name of the employee you want to add?",

                },
                {
                    type: 'input',
                    name: 'employeeId',
                    message: "What is the ID of the employee you want to add?",

                },
                {
                    type: 'input',
                    name: 'employeeRole',
                    message: "What is the role of the employee you want to add?",

                },

                {
                    type: 'input',
                    name: 'nameOfDepartment',
                    message: "What is the department in which the employee is being added?",
                },
                {
                    type: 'list',
                    name: 'ChoosingOptions',
                    message: "You added a new employee successfuly \n  Press enter to go to the main menu plase",
                    choices: ['Go to the main menu']
                }
            ])
                // add role here enter the name, salary, and department for the role and that role is added to the database
                .then(function (selectedAnswer) {
                    if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                        init();


                    };
                })
        } else if (selectedAnswer.ChoosingOptions === "Update  manager") {
           
            //===========     update managers ================
             
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'managerName',
                    message: "What is the name of the manager being updated?",

                },
                {
                    type: 'input',
                    name: 'employeeLastName',
                    message: "What is the last name of the employee you want to add?",

                },
                {
                    type: 'input',
                    name: 'idOfTheManager',
                    message: "What is the ID of the manager being updated?",

                },
                {
                    type: 'input',
                    name: 'employeeSalary',
                    message: "What is your salary amountof the manager being updated?",

                },
                {
                    type: 'input',
                    name: 'nameOfDepartment',
                    message: "What is your the department of the manager being updated?",
                },
                {
                    type: 'list',
                    name: 'ChoosingOptions',
                    message: "You updated an employee's role successfuly \n  Press enter to go to the main menu plase",
                    choices: ['Go to the main menu']
                }

                // update role here select an employee to update and their new role and this information is updated in the database
            ]).then(function (selectedAnswer) {
                if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                    init();
                };
            })
        } else if (selectedAnswer.ChoosingOptions === "Delete manager") {
            //  show table of employees' names
            // ============      deleting roles, departments, employees    ==========
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'deletingOption',
                    message: "What would you like to delete?",
                    choices: ['Department', 'role', 'employee']
                },
                {
                    type: 'list',
                    name: 'ChoosingOptions',
                    message: "Your deletion prosess was successfuly done!\n  Press enter to go to the main menu plase",
                    choices: ['Go to the main menu']
                }

            ])
                // update role here select an employee to update and their new role and this information is updated in the database
                .then(function (selectedAnswer) {
                    if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                        init();
                    };
                })
        } else if (selectedAnswer.ChoosingOptions === "Delete") {
            //  show table of employees' names
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'deletingOption',
                    message: "What would you like to delete?",
                    choices: ['Department', 'role', 'employee']
                },
                {
                    type: 'list',
                    name: 'ChoosingOptions',
                    message: "Your deletion prosess was successfuly done!\n  Press enter to go to the main menu plase",
                    choices: ['Go to the main menu']
                }

            ])
                // update role here select an employee to update and their new role and this information is updated in the database
                .then(function (selectedAnswer) {
                    if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                        init();
                    };
                })
        } 
        else if (selectedAnswer.ChoosingOptions == "Quit") {
           
            console.log("Press ctrl + C key to exit");
            console.log("Have a wonderful day. Bye!!!");
        };
        
        
       
    })
}

init();

// db.connect(function (err) {
            //     if (err) throw err;
            //     db.query('select * from departments', function (err, result) {
            //         if (err) throw err;
            //         console.table(result);
            //     });
            // })

// GIVEN a command-line application that accepts user input
// WHEN I start the application *
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role *
// WHEN I choose to view all departments *
// THEN I am presented with a formatted table showing department names and department ids  *
// WHEN I choose to view all roles *
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role *
// WHEN I choose to view all employees *
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to *
// WHEN I choose to add a department *
// THEN I am prompted to enter the name of the department and that department is added to the database *
// WHEN I choose to add a role *
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database *
// WHEN I choose to add an employee *
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database *
// WHEN I choose to update an employee role *
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
