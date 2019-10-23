'use strict';
module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE
  }, {});
  Test.associate = function(models) {
    // associations can be defined here
  };
  return Test;
};