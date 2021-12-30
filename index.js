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

        choices: ['View all Departments', 'View all Roles', 
        'View All Employees', 'View all Employees by Department', 
        'View all Managers', 'View Budget of each Department', 
        'Add a Department', 'Add a Role', 'Add an Employee', 
        'Update an Employee Role', 'Update an Employee Manager', 
        'Delete a Department', 'Delete a Role', 
        'Delete an employee', 'Quit']
     
    }).then(function (selectedAnswer) {
        if (selectedAnswer.ChoosingOptions === "View all Departments") {
            db.connect(function (err) {
                if (err) throw err;
                db.query('SELECT * FROM departments', function (err, result) {
                    if (err) throw err;
                    console.log("\n");
                    console.table(result);
                });
            })
            inquirer.prompt({

                type: 'list',
                name: 'ChoosingOptions',
                message: "Here are all departments \n  Press enter to go to the main menu please",
                choices: ['Go to the main menu']
            }).then(function (selectedAnswer) {

                if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                    init();
                }
            })

        } else if (selectedAnswer.ChoosingOptions === "View all Roles") {
            db.connect(function (err) {
                if (err) throw err;
                db.query('SELECT  roles.title AS Job_title, roles.id AS Role_Id, department_id AS Department_id, roles.salary AS Salary FROM roles JOIN departments  ON  departments.id = department_id;', function (err, result) {
                    if (err) throw err;
                    console.log("\n");
                    console.table(result);
                });
            })

            inquirer.prompt({
                type: 'list',
                name: 'ChoosingOptions',
                message: "Here are all the roles \n  Press enter to go to the main menu please",
                choices: ['Go to the main menu']
            }).then(function (selectedAnswer) {
                if (selectedAnswer.ChoosingOptions === "Go to the main menu") {

                    init();
                };
            });

        } else if (selectedAnswer.ChoosingOptions === "View All Employees") {
            db.connect(function (err) {
                if (err) throw err;
                db.query(' SELECT employee.id AS Employee_id, employee.first_name, employee.last_name, roles.title AS Job_title, employee.role_id, roles.department_id, roles.salary, employee.manager_id FROM employee JOIN roles ON  employee.role_id = roles.id;', 
                function (err, result) {
                    if (err) throw err;
                    console.log("\n");
                    console.table(result);
                });
            })
            inquirer.prompt({

                type: 'list',
                name: 'ChoosingOptions',
                message: "Here are all the employees \n  Press enter to go to the main menu please",
                choices: ['Go to the main menu']
            }).then(function (selectedAnswer) {
                if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                    init();
                };
            });
        }
        else if (selectedAnswer.ChoosingOptions === "View all Employees by Department") {
            db.connect(function (err) {
                if (err) throw err;
                db.query('SELECT employee.first_name, employee.last_name, employee.role_id, roles.department_id, departments.department_name FROM employee INNER JOIN roles ON employee.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id;', function (err, result) {
                    if (err) throw err;
                    console.log("\n");
                    console.table(result);
                });
            })
            inquirer.prompt({

                type: 'list',
                name: 'ChoosingOptions',
                message: "Here are all the employees \n  Press enter to go to the main menu please",
                choices: ['Go to the main menu']
            }).then(function (selectedAnswer) {
                if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                    init();
                };
            });
        }


        else if (selectedAnswer.ChoosingOptions === "View all Managers") {
            db.connect(function (err) {
                if (err) throw err;
                db.query('SELECT * FROM employee WHERE role_id = 1', function (err, result) {
                    if (err) throw err;
                    console.log("\n");
                    console.table(result);
                });
            })

            inquirer.prompt({
                type: 'list',
                name: 'ChoosingOptions',
                message: "Here are all the Managers \n  Press enter to go to the main menu please",
                choices: ['Go to the main menu']
            }).then(function (selectedAnswer) {
                if (selectedAnswer.ChoosingOptions === "Go to the main menu") {

                    init();
                };
            });

        } else if (selectedAnswer.ChoosingOptions === "View Budget of each Department") {
            db.connect(function (err) {
                if (err) throw err;
                db.query('SELECT   departments.id, departments.department_name,roles.department_id, SUM(roles.salary) AS Department_budget FROM departments INNER JOIN roles ON roles.department_id=departments.id GROUP BY departments.id;', function (err, result) {
                    if (err) throw err;
                    console.log("\n");
                    console.table(result);
                });
            })

            inquirer.prompt({
                type: 'list',
                name: 'ChoosingOptions',
                message: "Here are all the Managers \n  Press enter to go to the main menu please",
                choices: ['Go to the main menu']
            }).then(function (selectedAnswer) {
                if (selectedAnswer.ChoosingOptions === "Go to the main menu") {

                    init();
                };
            });
        }
            else if (selectedAnswer.ChoosingOptions === "Add a Department") {
            // ======================= adding department ====================
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'nameOfDepartment',
                    message: "Give a name to the department you want to add",
                },
                {
                    type: 'list',
                    name: 'ChoosingOptions',
                    message: "You added a deparment successfuly \n  Press enter to go to the main menu please",
                    choices: ['Go to the main menu']
                }
            ]).then(function (selectedAnswer) {
                    db.connect(function (err) {
                        if (err) throw err;
                        db.query('INSERT INTO departments SET ?', {
                             department_name: selectedAnswer.nameOfDepartment
                        },
                            function (err, result) {
                                if (err) throw err;
                                console.log("\n"); 
                            });
                    })
                    if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                        init();
                };
            })
        } else if (selectedAnswer.ChoosingOptions === "Add a Role") { 
            //  ================   adding role =============
            inquirer.prompt([
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
                    message: "What is the ID of the department in which this role is being added to?",
                },
                {
                    type: 'list',
                    name: 'ChoosingOptions',
                    message: "You added a role successfuly \n  Press enter to go to the main menu please",
                    choices: ['Go to the main menu']
                }
            ]).then(function (selectedAnswer) {
                db.connect(function (err) {
                    if (err) throw err;
                    db.query('INSERT INTO roles SET ?', {
                        title: selectedAnswer.tilteOfRole,
                        salary: selectedAnswer.salaryOfRole,
                        department_id: selectedAnswer.idOfDepartment
                        },
                        function (err, result) {
                            if (err) throw err;
                            console.log("\n"); 
                        });
                })
                if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                    init();
                };
            });
        } else if (selectedAnswer.ChoosingOptions === "Add an Employee") {
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
                    name: 'employeeIdRole',
                    message: "What is the role Id of the employee you want to add?",
                },
                {
                    type: 'input',
                    name: 'managerId',
                    message: "What is the ID of your future manager?",
                },
                {
                    type: 'list',
                    name: 'ChoosingOptions',
                    message: "You added a new employee successfuly \n  Press enter to go to the main menu please",
                    choices: ['Go to the main menu']
                }
            ]).then(function (selectedAnswer) {
                    db.connect(function (err) {
                        if (err) throw err;
                        db.query('INSERT INTO employee SET ?', {
                            first_name: selectedAnswer.employeeName,
                            last_name: selectedAnswer.employeeLastName,
                            role_id: selectedAnswer.employeeIdRole,
                            manager_id: selectedAnswer.managerId
                        },
                            function (err, result) {
                                if (err) throw err;
                                console.log("\n");
                            });
                    })
                    if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                        init();
                    };
                })
        } else if (selectedAnswer.ChoosingOptions === "Update an Employee Role") {
            //===========     update employeed ================
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'newRoleIdOfEmployee',
                    message: "What is the new role ID of the employee being updated?",
                },
                {
                    type: 'input',
                    name: 'employeeId',
                    message: "What is the  id  of the employee?",
                },
                {
                    type: 'list',
                    name: 'ChoosingOptions',
                    message: "You updated an employee's role successfuly \n  Press enter to go to the main menu please",
                    choices: ['Go to the main menu']
                }
            ]).then(function (selectedAnswer) {
                db.connect(function (err) {
                    if (err) throw err;
                    db.query('UPDATE employee SET employee.role_id = ?  WHERE  employee.id = ?;', [
                    selectedAnswer.newRoleIdOfEmployee,
                    selectedAnswer.employeeId,
                        
                    ],
                        function (err, result) {
                            if (err) throw err;
                            console.log("\n");
                        });
                    if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                        init();
                    };
                })
            });
        } else if (selectedAnswer.ChoosingOptions === "Update an Employee Manager") {

            //===========     update employee's manager ================
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'idOfTheManager',
                    message: "What is your new Manager's ID?",
                },
                {
                    type: 'input',
                    name: 'idOfTheEmployee',
                    message: "What is the employee's ID?",
                },
                // {
                //     type: 'input',
                //     name: 'employeeRoleId',
                //     message: "What is the employee's role ID?",
                // },
                {
                    type: 'list',
                    name: 'ChoosingOptions',
                    message: "You updated an employee's role successfuly \n  Press enter to go to the main menu please",
                    choices: ['Go to the main menu']
                }
            ]).then(function (selectedAnswer) {
                db.connect(function (err) {
                    if (err) throw err;
                    db.query('UPDATE employee SET employee.manager_id = ? WHERE employee.id = ?;',
                        [
                            selectedAnswer.idOfTheManager,
                            selectedAnswer.idOfTheEmployee,
                            // selectedAnswer.employeeRoleId,
                        ],
                        function (err, result) {
                            if (err) throw err;
                            console.log("\n");
                            // console.log(selectedAnswer.roleId);
                            // 
                        });
                    if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                        init();
                    };
                })
            });
        }
        else if (selectedAnswer.ChoosingOptions === "Delete a Department") {
            // ============      deleting roles, departments, employees    ==========
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'deletingDepartment',
                    message: "What is the department's ID you whould like to delete?",
                },
                {
                    type: 'list',
                    name: 'ChoosingOptions',
                    message: "Your deletion prosess was successfuly done!\n  Press enter to go to the main menu please",
                    choices: ['Go to the main menu']
                }
            ]).then(function (selectedAnswer) {
                    db.connect(function (err) {
                        if (err) throw err;
                        db.query('DELETE FROM departments WHERE ?', { id: selectedAnswer.deletingDepartment },
                            function (err, result) {
                                if (err) throw err;
                                console.log("\n");                               
                            });
                    })
                    if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                        init();
                    };
                })
        } else if (selectedAnswer.ChoosingOptions === "Delete a Role") {
            // ============      deleting roles, departments, employees    ==========
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'deletingRole',
                    message: "What is the role's ID you whold like to delete?",                    
                },
                {
                    type: 'list',
                    name: 'ChoosingOptions',
                    message: "Your deletion prosess was successfuly done!\n  Press enter to go to the main menu please",
                    choices: ['Go to the main menu']
                }
            ])
                // update role here select an employee to update and their new role and this information is updated in the database
                .then(function (selectedAnswer) {
                    db.connect(function (err) {
                        if (err) throw err;
                        db.query('DELETE FROM roles WHERE ?', { id: selectedAnswer.deletingRole },
                            function (err, result) {
                                if (err) throw err;
                                console.log("\n");                                
                            });
                    })
                    if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                        init();
                    };
                })
        } else if (selectedAnswer.ChoosingOptions === "Delete an employee") {        
            // ============      deleting roles, departments, employees    ==========
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'deletingEmployee',
                    message: "What is the ID of the emoployee you would like to delete?",
                },
                {
                    type: 'list',
                    name: 'ChoosingOptions',
                    message: "Your deletion prosess was successfuly done!\n  Press enter to go to the main menu please",
                    choices: ['Go to the main menu']
                }
            ])
                .then(function (selectedAnswer) {
                    db.connect(function (err) {
                        if (err) throw err;
                        db.query('DELETE FROM employee WHERE ?', { id: selectedAnswer.deletingEmployee },
                            function (err, result) {
                                if (err) throw err;
                                console.log("\n");
                            });
                    });
                    if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                        init();
                    };
                });
        } else if (selectedAnswer.ChoosingOptions === "Quit") {
            console.log("Press ctrl + C key to exit");
            console.log("Have a wonderful day. Bye!!!");
        };
    })
}
init();
// SELECT sum(salary) FROM roles;
// SELECT * FROM employee WHERE role_id = 10;
            // db.connect(function (err) {
            //     if (err) throw err;
            //     db.query('DELETE FROM departments WHERE ?',{department_name: selectedAnswer.nameOfDepartment},
            //     function (err, result) {
            //         if (err) throw err;
            //         console.log("\n");
            //         // console.table(result);
            //         //
            //     });
            // })

// db.connect(function (err) {
            //     if (err) throw err;
            //     db.query('select * from departments', function (err, result) {
            //         if (err) throw err;
            //         console.table(result);
            //     });
            // })

// GIVEN a command-line application that accepts user input
// WHEN I start the application      DONE=======
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role * DONE======

// WHEN I choose to view all departments *
// THEN I am presented with a formatted table showing department names and department ids  * DONE=======

// WHEN I choose to view all roles *
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role * DONE ===========

// WHEN I choose to view all employees *
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to * DONE =====

// WHEN I choose to add a department *
// THEN I am prompted to enter the name of the department and that department is added to the database * DONE ==========

// WHEN I choose to add a role *
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database *

// WHEN I choose to add an employee *
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database *

// WHEN I choose to update an employee role *
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
