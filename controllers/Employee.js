const EmployeeModel = require('../models/employee')
class EmployeeController {
    constructor () {
        this.$model = EmployeeModel
    }


    async create (data) {
        const employee = await this.$model.create(data)

        return employee
    }

    async get () {
        const employees = await this.$model.get()
        return employees
    }

    async getByID (id) {
        const employee = await this.$model.getByID(id)
        return employee
    }

    async delete (id) {
        const employee = await this.getByID(id)
        console.log(`delete`, employee)
        if (employee) {
            await this.$model.delete(id)
            return true
        }
        return false
    }
}

module.exports = new EmployeeController();
