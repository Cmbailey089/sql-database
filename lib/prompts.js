const inquirer = require('inquirer');
const Execute = require('./render');
require('console.table');

const run = new Execute;


function loadOut() {
    return inquirer.prompt([
        {
            type:'list',
            name:'choice',
            message:'What would you liek to do?',
            choices:[
                {name: 'Veiw all Departments',
            value:'VEIW_DEPARTMENTS'
        }
            ]
        }
    ])

    .then(({ choice }) => {
        
        switch(choice) {
            case 'VEIW_DEPARTMENTS':
            run.veiwDepartments();
            break;
            default:console.log('wrong')
        }
    })
}

loadOut();



