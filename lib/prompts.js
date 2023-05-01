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
                    name: 'Veiw all Departments',
            value:'VEIW_DEPARTMENTS'
        },
        {
            name: 'veiw all employees',
            value: 'VEIW_EMPLOYEES'
        },
        {
            name:'veiw all roles',
            value:'veiw_roles'
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
            case 'VEIW_DEPARTMENTS':
            allDepartments();
            break;
            case 'VEIW_EMPLOYEES':

            break;
            case 'veiw_roles':

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
    run.veiwDepartments().then(([line]) =>{
        let departemnts = line;
        console.log('\n');
        console.table(departemnts);
    })
    .then(()=> loadOut());
}

loadOut();



