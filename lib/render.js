const connect = require('./connection');



class Execute {
    constructor(connect) {
        this.connect = connect;
    }


veiwDepartments() {
    return this.connect.promise().query(
        "SELECT department_id, department.name FROM department;"
    )}}

    module.exports = Execute;