'use strict';
module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    assetCode: DataTypes.STRING,
    assetTypeId: DataTypes.INTEGER,
    assetInfor: DataTypes.STRING,
    assetPurposeId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    employeeManagedId: DataTypes.INTEGER,
    employeeOwnerId: DataTypes.INTEGER,
    note: DataTypes.STRING,
    confirm: DataTypes.STRING
  }, {});
  Asset.associate = function(models) {
    // associations can be defined here
    models.Asset.belongsTo(models.Employee, {as: "Owner", foreignKey: "employeeOwnerId"})
    models.Asset.belongsTo(models.Employee, {as: "Manager", foreignKey: "employeeManagedId"})
    models.Asset.belongsTo(models.AssetType, {foreignKey: "assetTypeId"})
    models.Asset.belongsTo(models.Purpose, {foreignKey: "assetPurposeId"})
  };
  return Asset;
};