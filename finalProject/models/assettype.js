'use strict';
module.exports = (sequelize, DataTypes) => {
  const AssetType = sequelize.define('AssetType', {
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  }, {});
  AssetType.associate = function(models) {
    // associations can be defined here
    models.AssetType.belongsTo(models.Employee, {foreignKey: 'ownerId'})
  };
  return AssetType;
};