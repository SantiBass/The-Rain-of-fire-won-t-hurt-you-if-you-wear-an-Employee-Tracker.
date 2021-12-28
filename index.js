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

        choices: ['View all Departments', 'View all roles', 'View all employees', 'View all Employees by department','View all Managers', 'View Budget of each Department', 'Add a Department', 'Add a role', 'Add an employee', 'Update an Employee', 'Update an Employee Manager', 'Delete a Department', 'Delete a Role', 'Delete an employee', 'Quit']
        // 'Add a Manager',
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
                message: "Here are all departments \n  Press enter to go to the main menu plase",
                choices: ['Go to the main menu']
            }).then(function (selectedAnswer) {

                if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                    init();
                }
            })

        } else if (selectedAnswer.ChoosingOptions === "View all roles") {
            // add table HERE for departments BY NAME AND ID
            db.connect(function (err) {
                if (err) throw err;
                db.query('SELECT * FROM roles', function (err, result) {
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
                db.query('SELECT * FROM employee', function (err, result) {
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
        }
        else if (selectedAnswer.ChoosingOptions === "View all Employees by department") {
            // add table HERE for all employees presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
            db.connect(function (err) {
                if (err) throw err;
                db.query('SELECT employee.first_name, employee.last_name, employee.role_id, roles.department_id, departments.department_name FROM employee INNER JOIN roles ON employee.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id;',function (err, result) {
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
        }
        
        
        else if (selectedAnswer.ChoosingOptions === "View all Managers") {
            // add table HERE for departments BY NAME AND ID
            db.connect(function (err) {
                if (err) throw err;
                db.query('SELECT * FROM employee WHERE role_id = 10', function (err, result) {
                    if (err) throw err;
                    console.log("\n");
                    console.table(result);
                });
            })

            inquirer.prompt({
                // add table HERE for all roles presented with the job title, role id, the department that role belongs to, and the salary for that role
                type: 'list',
                name: 'ChoosingOptions',
                message: "Here are all the Managers \n  Press enter to go to the main menu plase",
                choices: ['Go to the main menu']
            }).then(function (selectedAnswer) {
                if (selectedAnswer.ChoosingOptions === "Go to the main menu") {

                    init();
                };
            });

        } else if (selectedAnswer.ChoosingOptions === "View Budget of each Department") {
            // add table HERE for departments BY NAME AND ID
            db.connect(function (err) {
                if (err) throw err;
                db.query('SELECT   departments.id, departments.department_name,roles.department_id, SUM(roles.salary) AS Department_budget FROM departments INNER JOIN roles ON roles.department_id=departments.id GROUP BY departments.id;', function (err, result) {
                    if (err) throw err;
                    console.log("\n");
                    console.table(result);
                });
            })

            inquirer.prompt({
                // add table HERE for all roles presented with the job title, role id, the department that role belongs to, and the salary for that role
                type: 'list',
                name: 'ChoosingOptions',
                message: "Here are all the Managers \n  Press enter to go to the main menu plase",
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
                    message: "You added a deparment successfuly \n  Press enter to go to the main menu plase",
                    choices: ['Go to the main menu']
                }
            ])
                // add department here prompted to enter the name of the department and that department is added to the database
                .then(function (selectedAnswer) {
                    db.connect(function (err) {
                        if (err) throw err;
                        db.query('INSERT INTO departments SET ?', {
                            department_name: selectedAnswer.nameOfDepartment
                        },
                            function (err, result) {
                                if (err) throw err;
                                console.log("\n");
                                // console.table(result);
                                // 
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
                    message: "What is the ID of the department in which this role is being added to?",

                },
                {
                    type: 'list',
                    name: 'ChoosingOptions',
                    message: "You added a role successfuly \n  Press enter to go to the main menu plase",
                    choices: ['Go to the main menu']
                }
            ]).then(function (selectedAnswer) {
                db.connect(function (err) {
                    if (err) throw err;
                    db.query('INSERT INTO roles SET ?', {
                        // id: selectedAnswer.id,
                        title: selectedAnswer.tilteOfRole,
                        salary: selectedAnswer.salaryOfRole,
                        department_id: selectedAnswer.idOfDepartment

                    },
                        function (err, result) {
                            if (err) throw err;
                            console.log("\n");
                            // console.table(result);
                            // 
                        });
                })
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
                    name: 'employeeIdRole',
                    message: "What is the role ID of the employee you want to add?",

                },
                {
                    type: 'input',
                    name: 'managerId',
                    message: "What is the ID of your future manager?",
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
                    db.connect(function (err) {
                        if (err) throw err;
                        db.query('INSERT INTO employee SET ?', {

                            first_name: selectedAnswer.employeeName,
                            last_name: selectedAnswer.employeeLastName,
                            role_id: selectedAnswer.employeeIdRole,
                            manager_id : selectedAnswer.managerId
                        },
                            function (err, result) {
                                if (err) throw err;
                                console.log("\n");
                                // console.table(result);
                                // 
                            });
                    })
                    if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                        init();


                    };
                })
        } else if (selectedAnswer.ChoosingOptions === "Update an Employee") {

            //===========     update employeed ================
            // I need employee ID and role_id
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'idOfTheEmployee',
                    message: "What is the ID of the employee being updated?",
                },
                {
                    type: 'input',
                    name: 'roleId',
                    message: "What is the new role id  of the employee?",
                },
                {
                    type: 'list',
                    name: 'ChoosingOptions',
                    message: "You updated an employee's role successfuly \n  Press enter to go to the main menu plase",
                    choices: ['Go to the main menu']
                }
                // update role here select an employee to update and their new role and this information is updated in the database
            ]).then(function (selectedAnswer) {
                db.connect(function (err) {
                    if (err) throw err;
                    db.query('UPDATE employee SET role_id = ?, manager_id = null WHERE id = ?', [
                        selectedAnswer.roleId,
                        selectedAnswer.idOfTheEmployee,
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
        }else if (selectedAnswer.ChoosingOptions === "Update an Employee Manager") {

            //===========     update employee's manager ================
            // I need employee ID and role_id
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'idOfTheManager',
                    message: "What is your Manager's ID?",
                },
                {
                    type: 'input',
                    name: 'employeeRoleId',
                    message: "What is the employee's role ID?",
                },
                {
                    type: 'input',
                    name: 'idOfTheEmployee',
                    message: "What is the employee's ID?",
                },
                {
                    type: 'list',
                    name: 'ChoosingOptions',
                    message: "You updated an employee's role successfuly \n  Press enter to go to the main menu plase",
                    choices: ['Go to the main menu']
                }
            ]).then(function (selectedAnswer) {
                db.connect(function (err) {
                    if (err) throw err;
                db.query( 'UPDATE employee SET employee.manager_id = ?, employee.role_id = ? WHERE employee.id = ?;',
                        // 'UPDATE employee SET role_id = ?, manager_id = null WHERE id = ?', 
                        [
                            selectedAnswer.idOfTheManager,
                            selectedAnswer.employeeRoleId,
                            selectedAnswer.idOfTheEmployee,
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
            //  show table of employees' names
            // ============      deleting roles, departments, employees    ==========
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'deletingDepartment',
                    message: "What is the department's ID you whold like to delete?",
                    // choices: ['Department', 'role', 'employee']
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
                    db.connect(function (err) {
                        if (err) throw err;
                        db.query('DELETE FROM departments WHERE ?', { id: selectedAnswer.deletingDepartment },
                            function (err, result) {
                                if (err) throw err;
                                console.log("\n");
                                // console.table(result);
                                // 
                            });
                    })
                    if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                        init();
                    };
                })
        }else if (selectedAnswer.ChoosingOptions === "Delete a Role") {
            //  show table of employees' names
            // ============      deleting roles, departments, employees    ==========
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'deletingRole',
                    message: "What is the role's ID you whold like to delete?",
                    // choices: ['Department', 'role', 'employee']
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
                    db.connect(function (err) {
                        if (err) throw err;
                        db.query('DELETE FROM roles WHERE ?', { id: selectedAnswer.deletingRole },
                            function (err, result) {
                                if (err) throw err;
                                console.log("\n");
                                // console.table(result);
                                // 
                            });
                    })
                    if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                        init();
                    };
                })
        } else if (selectedAnswer.ChoosingOptions === "Delete an employee") {
            //  show table of employees' names
            // ============      deleting roles, departments, employees    ==========
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'deletingEmployee',
                    message: "What is the ID of the emoployee whold like to delete?",
                    // choices: ['Department', 'role', 'employee']
                },
                {
                    type: 'list',
                    name: 'ChoosingOptions',
                    message: "Your deletion prosess was successfuly done!\n  Press enter to go to the main menu plase",
                    choices: ['Go to the main menu']
                }

            ])// update role here select an employee to update and their new role and this information is updated in the database
                .then(function (selectedAnswer) {
                    db.connect(function (err) {
                        if (err) throw err;
                        db.query('DELETE FROM employee WHERE ?', { id: selectedAnswer.deletingEmployee },
                            function (err, result) {
                                if (err) throw err;
                                console.log("\n");
                                // console.table(result);
                                // 
                            });
                    });
                if (selectedAnswer.ChoosingOptions === "Go to the main menu") {
                        init();
                    };
                });
        }else if (selectedAnswer.ChoosingOptions === "Quit") {

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
