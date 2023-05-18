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

    updateEmployeeRole( roles_id,employee_id) {
        return this.connect.promise().query('UPDATE employee SET roles_id = ? WHERE id =?',[roles_id, employee_id])
    }

    updateEmpManager(manager_id,employee_id) {
        return this.connect.promise().query('UPDATE employee SET manager_id = ? WHERE id =?',[manager_id, employee_id])
    }

    createEmployee(employee) {
        return this.connect.promise().query('INSERT INTO employee SET ?',employee)
    }

    createRole(role) {
        return this.connect.promise().query('INSERT INTO roles SET ?',role)
    }

    createDept(department) {
        return this.connect.promise().query('INSERT INTO department SET ?',department)
    }

    removeEmployee(id) {
        return this.connect.promise().query('DELETE FROM employee WHERE id=?',id)
    }

    removeRole(id) {
        return this.connect.promise().query('DELETE FROM roles WHERE id =?',id)

    }
    removeDept(department_id) {
        return this.connect.promise().query('DELETE FROM department WHERE id =?',department_id)
    }

    viewEmpByDept(department_id) {
        return this.connect.promise().query('SELECT employee.id,employee.first_name,employee.last_name, roles.title FROM employee LEFT JOIN roles ON employee.roles_id = roles.id LEFT JOIN department department ON roles.department_id = department.id WHERE department.id =?',department_id)
    }

    viewEmpByMang(manager_id) {
        return this.connect.promise().query('SELECT employee.id,employee.first_name,employee.last_name, department.name AS department, roles.title FROM employee LEFT JOIN ON roles.id =employee.roles_id LEFT JOIN department ON department.id = roles.department_id WHERE manager_id =?', manager_id)
    }

    viewAllMang() {
        return this.connect.promise().query('SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL')
    }

    viewDeptBudget() {
        return this.connect.promise().query('SELECT department.id, department.name, SUM(roles.salary) AS budget FROM employee LEFT JOIN roles ON employee.roles_id= roles.id LEFT JOIN department ON roles.department_id = department.id GROUP BY department.id,department.name')
    }
}

    module.exports = Execute;