'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    idCard: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    employeeRoleId: DataTypes.INTEGER,
    departmentId: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER
  }, {});
  Employee.associate = function(models) {
    // associations can be defined here
    models.Employee.belongsTo(models.Role, {foreignKey: 'employeeRoleId'})
    models.Employee.belongsTo(models.Department, {foreignKey: 'departmentId'})
    models.Employee.belongsTo(models.Employee, {foreignKey: 'ownerId', as: "Owner"})
    models.Employee.hasMany(models.Asset,{foreignKey: "employeeOwnerId"})
    models.Employee.hasMany(models.Asset, {foreignKey: "employeeManagedId", as: "Managed"})
  };
  Employee.prototype.isValidPassword = function(password) {
    return (password === this.password ? true: false)
  };
  return Employee;
};