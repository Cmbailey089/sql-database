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
            name:'view all managers',
            value:'view managers'
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
            addDepartment();
            break;
            case 'add_role':
            addRole();
            break;
            case 'add_employee':
            addEmployee();
            break;
            case 'view managers':

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


function addDepartment() {
    inquirer.prompt(
        {
            name:'name',
            message:'What is the name of the department?'
        }
    )
    .then(res=> {
        let name = res;
        run.createDept(name)
        .then(()=> 
        console.log(`added ${name.name} to the database`))
        .then(()=> loadOut());
    })  
}

function addRole() {
    run.viewDepartments()
    .then(([rows])=>{
        let departments = rows;
        const deptChoices = departments.map(({name,id})=> ({
            name: name,
            value:id
        }))
        inquirer.prompt([
            {
                name:'title',
                message: 'What is the name of the role?'
            },
            {
                name:'salary',
                message:'What is the salary of this role?'
            },
            {
                type: 'list',
                name:'department_id',
                message:'Which department does this role belong to?',
                choices: deptChoices
            }
        ])
        .then(role=>{
            run.createRole(role)
            .then(()=> 
            console.log(`Added ${role.title} to the database.`))
            .then(()=> loadOut());
        })
    })
}
 
function addEmployee() {
    inquirer.prompt([
        {
            name:'first_name',
            message:'What is the first name of new employee?'
        },
        {
            name:'last_name',
            message:'What is the last name of new employee?'
        }
    ])
    .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;
        run.viewRoles()
        .then(([rows])=>{
            let role = rows;
            const roleChoices = role.map(({title,id})=>({
            name:title,
            value:id
        }))
        inquirer.prompt([
            {
                name:'list',
                message:'What is the role for the new employee?',
                choices:roleChoices
            }
        ])
        .then(res => {
            var roleId = res.role_id;
            run.viewAllMang().then(([row])=> {
                let manager = row;
                const mangChoices = manager.map(({id,name})=>({
                    name:name,
                    value:id
                }))
                inquirer.prompt([
                    {
                        name:'list',
                        message:'Who is this employees manager?',
                        choices:[mangChoices, 'none']
                    }
                ])
                .then(res => {
                    let employee ={ manager_id: res.managerId,
                                    role_id: roleId,
                                    first_name: firstName,
                                    last_name: lastName
                    }
                   run.createEmployee(employee);
                    })
                    .then(()=> {
                        console.log(`Added ${first_name} ${last_name} to database.`)
                        .then(()=> loadOut());
                    })
                })
            })
            
        })
        })
    }

    function viewAllManagers() {
        run.viewAllMang(employee_id).then(([line])=>{
            let managers =line;
        console.log('\n');
    console.table(managers)})
    .then(()=>loadOut());
    }
    




loadOut();


// create prompt for first and last name
    // .then arrow function form res and save the name as var
    // run function to find all the roles and create array of choices
        // run pormpt a to ask employee role with role as choices
        // take res and save role_id as var
        // run function to find all employees and create array of manger choices
        // add an option of none for manager status
        // create prompts asking for manager
        // .then to build an obj to create an employee 
        // pass obj to create employee function