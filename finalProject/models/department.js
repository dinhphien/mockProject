'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    managerId: DataTypes.INTEGER
  }, {});
  Department.associate = function(models) {
    // associations can be defined here
    models.Department.hasMany(models.Employee, {as: "Employee",foreignKey: 'departmentId'})
    models.Department.belongsTo(models.Employee, {as: 'Owner', foreignKey: 'ownerId'})
    models.Department.belongsTo(models.Employee, {as: 'Manager', foreignKey: 'managerId'})
  };
  return Department;
};