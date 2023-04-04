class Employee {
    constructor(employeeName, employeeId, employeeEmail) {
        this.name = employeeName;
        this.id = employeeId;
        this.email = employeeEmail;
    }

    getName() {
        return this.name;
    };
    
    getId() {
        return this.id;
    };
    
    getEmail() {
        return this.email;
    };

    getRole() {
        return "Employee"
    }
};

module.exports = Employee;