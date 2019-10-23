'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      assetCode: {
        type: Sequelize.STRING
      },
      assetTypeId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'AssetTypes',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      },
      assetInfor: {
        type: Sequelize.STRING
      },
      assetPurposeId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Purposes',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      },
      status: {
        type: Sequelize.STRING
      },
      employeeManagedId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Employees',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      },
      employeeOwnerId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Employees',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      },
      note: {
        type: Sequelize.STRING
      },
      confirm: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Assets');
  }
};