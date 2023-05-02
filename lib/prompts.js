const inquirer = require('inquirer');
const Execute = require('./render');
require('console.table');

const run = new Execute;


function loadOut() {
    return inquirer.prompt([
        {
            type:'list',
            name:'choice',
            message:'What would you like to do?',
            choices:[
                {
                    name: 'View all Departments',
            value:'VIEW_DEPARTMENTS'
        },
        {
            name: 'view all employees',
            value: 'VIEW_EMPLOYEES'
        },
        {
            name:'view all roles',
            value:'view_roles'
        },
        {
            name:'add a ddepartment',
            value:'add_department'
        },
        {
            name:'add a role',
            value:'add_role'
        },
        {
            name:'add an employee',
            value:'add_employee'
        },
        {
            name:'update employee role',
            value:'alter_employee'
        },
        {
            name: 'Quit',
            value:'quit'
        }
            ]
        }
    ])

    .then(({ choice }) => {
        
        switch(choice) {
            case 'VIEW_DEPARTMENTS':
            allDepartments();
            break;
            case 'VIEW_EMPLOYEES':
            allEmployees();
            break;
            case 'view_roles':
            allRoles();
            break;
            case 'add_department':

            break;
            case 'add_role':

            break;
            case 'add_employee':

            break;
            case 'alter_employee':

            break;
            default:console.log(process.exit())
        }
    })
}

function allDepartments() {
    run.viewDepartments().then(([line]) =>{
        let departemnts = line;
        console.log('\n');
        console.table(departemnts);
    })
    .then(()=> loadOut());
}

function allEmployees() {
    run.viewEmployees().then(([line])=> {
        let employees = line;
       console.log('\n'); 
        console.table(employees);
    })
    .then(()=> loadOut());
}

function allRoles() {
    run.viewRoles().then(([line])=>{
        let roles = line;
        console.log('\n')
        console.table(roles);
    })
    .then(()=> loadOut());
}


function AddDepartment() {
    inquirer.prompt(
        {
            name:'name',
            message:'What is the name of the department?'
        }
    )
    .then()
    run.createDept()
}

loadOut();



