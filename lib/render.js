const connection = require('./connection');



class Execute {
    constructor() {
        this.connect = connection;
    }


    veiwDepartments() {
    return this.connect.promise().query(
        `SELECT * FROM department;`
        );
    }

    veiwEmployees() {
        return this.connect.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, departemnt.name AS department, role.salary, CONCAT(MANAGER.FISRT_NAME)"
        );
    }

}

    module.exports = Execute;