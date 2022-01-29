'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ContactUs', {
      
      ContactUsId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      SubjectType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Subject: {
        allowNull: true,
        type: Sequelize.STRING
      },
      PhoneNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Message: {
        allowNull: false,
        type: Sequelize.STRING
      },
      UploadFileName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      path: {
        type: Sequelize.STRING
      },
      CreatedBy: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      Status: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      Priority: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      AssignedToUser: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      IsDeleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ContactUs');
  }
};
