const inquirer = require('inquirer');
const Execute = require('./lib/render');
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
            name: 'view all Employees',
            value: 'VIEW_EMPLOYEES'
        },
        {
            name:'view all Roles',
            value:'view_roles'
        },
        {
            name:'add a Department',
            value:'add_department'
        },
        {
            name:'add a Role',
            value:'add_role'
        },
        {
            name:'add an Employee',
            value:'add_employee'
        },
        {
            name:'update Employee role',
            value:'alter_employee'
        },
        {
            name:'view all Managers',
            value:'view managers'
        },
        {
            name:'Remove Employee',
            value:'remove employee'
        },
        {
            name:'Remove role',
            value:'remove role'
        },
        {
            name:'Remove Department',
            value:'remove dept'
        },
        {
            name:'Update Employee',
            value:'update employee'
        },
        {
            name:'Update managers',
            value:'update manager'
        },
        {
            name:'View Employee by manager',
            value:'view employee by manager'
        },
        {
            name:'View Employee by department',
            value:'view employee by dept'
        },
        {
            name:'See companies budget',
            value:'budget'
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
            case 'VIEW_DEPARTMENTS':allDepartments();
            break;

            case 'VIEW_EMPLOYEES':allEmployees();
            break;

            case 'view_roles':allRoles();
            break;

            case 'add_department':addDepartment();
            break;

            case 'add_role': addRole();
            break;

            case 'add_employee': addEmployee();
            break;

            case 'view managers':viewAllManagers();
                break;

            case 'remove employee':deleteEmployee();
                break;

            case 'remove role':deleteRole();
                break;

            case 'remove dept':deleteDepartmnet();
                break;

            case 'update employee':updateEmployee();
                break;

            case 'update manager':updateManager();
                break;

            case 'view employee by manager':EmployeeByManager();
                break;

            case 'view employee by dept':EmployeeByDept();
                break;

            case 'budget':budget();
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
        .then(([row])=>{
            let role = row;
            const roleChoices = role.map(({title,id})=>({
            name:title,
            value:id
        }))
        inquirer.prompt([
            {
                type:'list',
                name:'roles_id',
                message:'What is the role for the new employee?',
                choices:roleChoices
            }
        ])
        .then(res => {
            var roleId = res.roles_id;
            run.viewAllMang().then(([row])=> {
                let manager = row;
                const mangChoices = manager.map(({first_name,manager_id})=>({
                    name:first_name,
                    value:manager_id
                }))
                inquirer.prompt([
                    {
                        type:'list',
                        name:'manager_id',
                        message:'Who is this employees manager?',
                        choices: mangChoices
                    }
                ])
                .then(res => {
                    var employee ={ manager_id: res.managerId,
                                    roles_id: roleId,
                                    first_name: firstName,
                                    last_name: lastName
                    }
                   run.createEmployee(employee)
                   .then(()=>
                        console.log(`Added ${firstName} ${lastName} to database.`))
                        .then(()=> loadOut())  
                    })
                         
                })
            })  
        })
    })
}

    function viewAllManagers() {
        run.viewAllMang().then(([line])=>{
            let managers =line;
        console.log('\n');
    console.table(managers)})
    .then(()=>loadOut());
    }

    function deleteEmployee() {
        run.viewEmployees().then(([row])=> {
            let employee = row;
            const employeeChoices = employee.map(({id,first_name})=>({
                name:first_name,
                value:id
            }))
            inquirer.prompt ([
                {
                    type:'list',
                    name:'employee_id',
                    message:'Who is getting canned?',
                    choices:employeeChoices
                }
            ])
            .then((res)=>{
                let id = res.employee_id;
                run.removeEmployee(id).then(()=>
                console.log(`Employee removed from database.`))
                .then(()=>loadOut());
            })
        })
    }
    
    function deleteDepartmnet() {
        run.viewDepartments().then(([row])=> {
            let dept = row;
            const deptChoices = dept.map(({id,name})=>({
                name:name,
                value:id
            }))
            inquirer.prompt ([
                {
                    type:'list',
                    name:'id',
                    message:'Which Department would you like to remove?',
                    choices:deptChoices
                }
            ])
            .then(id=>{
                run.removeDept(id).then(()=>
                console.log(`Department removed from database.`))
                .then(()=>loadOut());
            })
        })
    }

    function updateEmployee() {
        run.viewEmployees().then(([row])=> {
            let employee = row;
            const employeeChoices = employee.map(({id,first_name})=>({
                name:first_name,
                value:id
            }))
            inquirer.prompt ([
                {
                    type:'list',
                    name:'employee_id',
                    message:'Select employee to update.',
                    choices:employeeChoices
                }
            ])
            .then((res)=>{
                let employee_id = res.employee_id;
                run.viewRoles().then(([row])=>{
                    let roles = row;
                    const roleChoices = roles.map(({title,id})=>({
                        name:title,
                        value:id
                    }))
                    inquirer.prompt([
                        {
                            type:'list',
                            name:'id',
                            message:'What is the role for the new employee?',
                            choices:roleChoices
                }
            ])
            .then((res)=>{
                let roles_id = res.id;
                run.updateEmployeeRole(roles_id,employee_id).then(()=>
                console.log('Employee role has been updated.'))
                .then(()=>loadOut());
            })
        })
                
            })
        })
    }
    
    function updateManager() {
        run.viewEmployees().then(([row])=> {
            let employee = row;
            const employeeChoices = employee.map(({id,first_name})=>({
                name:first_name,
                value:id
            }))
            inquirer.prompt ([
                {
                    type:'list',
                    name:'employee_id',
                    message:'Select employee to update.',
                    choices:employeeChoices
                }
            ])
            .then((res)=>{
                let employee_id = res.employee_id;
                run.viewAllMang().then(([row])=>{
                    let manager = row;
                    const managerChoices = manager.map(({title,id})=>({
                        name:title,
                        value:id
                    }))
                    inquirer.prompt([
                        {
                            type:'list',
                            name:'id',
                            message:'Wh0 is the new manager for the employee?',
                            choices:managerChoices
                }
            ])
            .then((res)=>{
                let manager_id = res.id;
                run.updateEmpManager(manager_id,employee_id).then(()=>
                console.log('Employee role has been updated.'))
                .then(()=>loadOut());
            })
        })
                
            })
        })
    }

    function EmployeeByManager() {
        run.viewAllMang().then(([row])=>{
            let manager = row;
            const managerChoices = manager.map(({first_name,id})=>({
                name:first_name,
                value:id
            }))
            inquirer.prompt([
                {
                    type:'list',
                    name:'id',
                    message:'Wh0 is the new manager for the employee?',
                    choices:managerChoices
        }
    ])
    .then((res)=>{
        let manager_id = res.id;
        run.viewEmpByMang(manager_id).then(([row])=>{
        let manager = row;
        console.log('\n');
    console.table(manager)})
    .then(()=>loadOut());
    })
})
    }

    function EmployeeByDept() {
        run.viewDepartments().then(([row])=> {
            let dept = row;
            const deptChoices = dept.map(({id,name})=>({
                name:name,
                value:id
            }))
            inquirer.prompt ([
                {
                    type:'list',
                    name:'id',
                    message:'Which Department would you like to remove?',
                    choices:deptChoices
                }
            ])
            .then(res=>{
                let department_id = res.id
                run.viewEmpByDept(department_id).then(([row])=>{
                    let dept = row;
                console.log('\n');
                console.table(dept)})
                .then(()=>loadOut());
            })
        })
    }

    function budget() {
        run.viewDeptBudget().then(([line])=>{
            let budget =line;
        console.log('\n');
    console.table(budget)})
    .then(()=>loadOut());
    }

loadOut();