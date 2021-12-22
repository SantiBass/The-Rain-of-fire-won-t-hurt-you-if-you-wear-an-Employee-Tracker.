const inquirer = require('inquirer');
const { add } = require('lodash');
const PORT  = process.env.PORT ||  3005;
const mysql = require('mysql');
require ("console.table");

function init(){
inquirer.prompt({
type: "list",
name : "ChoosingOptions",
message: "===============================================\n  ****  Welcome to the Employee Traker app.  ****\n  ****  What would you like to do today?     **** \n  =============================================== \n",

choices: ['View all departments','View all roles', 'View all employees', 'Add departments', 'Add a role', 'Add an employee', 'Update  employee role',  'quit']
}).then(function(selectedAnswer){
    if(selectedAnswer.ChoosingOptions === "View all departments"){
        inquirer.prompt({
            // add table HERE for departments BY NAME AND ID
            type: 'list',
            name: 'ChoosingOptions',
            message: "Here are all departments \n  Press enter to go to the main menu plase",
            choices:['Go to the main menu']
            
        }).then(function(selectedAnswer){
            if(selectedAnswer.ChoosingOptions === "Go to the main menu"){
               init();

                
            }
        })

     } else if(selectedAnswer.ChoosingOptions === "View all roles"){
        inquirer.prompt({
        // add table HERE for all roles presented with the job title, role id, the department that role belongs to, and the salary for that role
        type: 'list',
        name: 'ChoosingOptions',
        message: "Here are all the roles \n  Press enter to go to the main menu plase",
        choices:['Go to the main menu']
    }).then(function(selectedAnswer){
        if(selectedAnswer.ChoosingOptions === "Go to the main menu"){
           init();

            
        }
    })

 } else if(selectedAnswer.ChoosingOptions === "View all employees"){
    inquirer.prompt({
    // add table HERE for all employees presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    type: 'list',
    name: 'ChoosingOptions',
    message: "Here are all the employees \n  Press enter to go to the main menu plase",
    choices:['Go to the main menu']
}).then(function(selectedAnswer){
    if(selectedAnswer.ChoosingOptions === "Go to the main menu"){
       init();

        
    }
})

 }

    

})
}

init();

// inquirer.prompt([
//     {
//     type: 'input',
//     name: 'nameOfDepartment',
//     message: "Give a name to the department you want to add",
    
// },
// {
//     type: 'input',
//     name: 'idOfDepartment',
//     message: "Give an ID to the department you want to add",
// }// add department here
// ]).then(function(selectedAnswer){
//     init();
// })


// GIVEN a command-line application that accepts user input
// WHEN I start the application *
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role *
// WHEN I choose to view all departments *
// THEN I am presented with a formatted table showing department names and department ids  *
// WHEN I choose to view all roles *
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role *
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
