const inquirer = require('inquirer');
const { add } = require('lodash');
const PORT  = process.env.PORT ||  3005;
const mysql = require('mysql');
require ("console.table");

function init(){
inquirer.prompt({
type: "list",
name : "ChosingOptions",
message: "=========================================================\n  *** Welcome to Employee Traker app.         ****\n  *** What would you like to do today?               *** " ,

choices: ['Add', 'remove', 'view', 'quit']
}).then(function(selectedAnswer){
    if(selectedAnswer.ChosingOptions === add){
        inquirer.prompt({
            type: 'list',
            name: 'ChosingOptions',
            message: ""
        });

    };
})
}

init();