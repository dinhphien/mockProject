'use strict';
module.exports = (sequelize, DataTypes) => {
  const Purpose = sequelize.define('Purpose', {
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  }, {});
  Purpose.associate = function(models) {
    // associations can be defined here
    models.Purpose.belongsTo(models.Employee, { foreignKey: "ownerId"})
  };
  return Purpose;
};