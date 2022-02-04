'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      UserId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FirstName: {
        type: Sequelize.STRING
      },
      LastName: {
        type: Sequelize.STRING
      },
      Email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      },
      Mobile: {
        type: Sequelize.STRING
      },
      UserTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      Gender: {
        type: Sequelize.INTEGER
      },
      DateOfBirth: {
        type: Sequelize.DATE
      },
      IsRegisteredUser: {
        type: Sequelize.BOOLEAN
      },
      WorksWithPets: {
        type: Sequelize.BOOLEAN
      },
      IsApproved: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      IsActive: {
        type: Sequelize.BOOLEAN
      },
      resetPasswordToken: { 
        type: Sequelize.STRING
      },
      resetPasswordExpires: { 
        type: Sequelize.DATE
      },
      emailToken: { 
        type: Sequelize.STRING
      },
      emailTokenExpires: { 
        type: Sequelize.DATE 
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
    await queryInterface.dropTable('Users');
  }
};