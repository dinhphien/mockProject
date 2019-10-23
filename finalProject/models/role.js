'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
    models.Role.belongsTo(models.Employee, {foreignKey: 'ownerId'})
  };
  return Role;
};