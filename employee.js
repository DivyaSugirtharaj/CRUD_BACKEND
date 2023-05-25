const {sequelize } = require('./db');
const Sequelize = require('sequelize');
const {Model, Datatypes} = require('sequelize');
class Employee extends Model{}
Employee.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    FirstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    LastName: {
        type: Sequelize.STRING
    },
    Gender: {
        type: Sequelize.STRING
    },
    MobileNo: {
        type: Sequelize.INTEGER
    },
    EmailId: {
        type: Sequelize.STRING
    },
    Country: {
        type: Sequelize.STRING
    },
    City: {
        type: Sequelize.STRING
    },
    State: {
        type: Sequelize.STRING
    }
}, {
    sequelize,
    modelName : 'Employee'
});


module.exports = Employee;