const connection = require('./connection');



class Execute {
    constructor() {
        this.connect = connection;
    }


    viewDepartments() {
    return this.connect.promise().query(
        `SELECT * FROM department;`
        );
    }

    viewEmployees() {
        return this.connect.promise().query(
            "SELECT * FROM employee;"
        );
    }

    viewRoles() {
        return this.connect.promise().query('SELECT * FROM roles;')
    }

    createEmployee(employee) {
        return this.connect.promise().query('INSERT INTO employee SET ?',employee)
    
    }

    removeEmployee(employee_id) {
        return this.connect.promise().query('DELETE FROM employee WHERE id=?',employee_id)
    }
    
    updateEmployeeRole(employee_id, role_id) {
        return this.connect.promise().query('UPDATE employee SET role_id = ? WHERE id =?',[role_id, employee_id])
    }

    updateEmpManager(employee_id, manager_id) {
        return this.connect.promise().query('UPDATE employee SET manager_id = ? WHERE id =?',[manager_id, employee_id])
    }

    createRole(role) {
        return this.connect.promise().query('INSERT INTO roles SET ?',role)
    }

    removeRole(role_id) {
        return this.connect.promise().query('DELETE FROM roles WHERE id =?',role_id)
    }

    createDept(department) {
        return this.connect.promise().query('INSERT INTO department SET ?',department)
    }

    removeDept(department_id) {
        return this.connect.promise().query('DELETE FROM department WHERE id =?',department_id)
    }

    viewEmpByDept(department_id) {
        return this.connect.promise().query('SELECT employee.id,employee.first_name,employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department department ON role.department_id = department.id WHERE department.id =?',department_id)
    }

    viewEmpByMang(manager_id) {
        return this.connect.promise().query('SELECT employee.id,employee.first_name,employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN ON role.id =employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id =?', manager_id)
    }

    viewAllMang(employee_id) {
        return this.connect.promise().query('SELECT id, first_name, last_name FROM employee WHERE id !=?',employee_id)
    }

    viewDeptBudget() {
        return this.connect.promise().query('SELECT department.id, department.name, SUM(role.salary) AS budget FROM employee LEFT JOIN role ON employee.role_id= role.id LEFT JOIN department ON role.department_id = department.id GROUP BY department.id,department.name')
    }
}

    module.exports = Execute;