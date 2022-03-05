'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rating', {
      RatingId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ServiceRequestId: {
        allowNull: false,
        references: {
          model:'ServiceRequest',
          key: 'ServiceRequestId'
        },
        type: Sequelize.INTEGER
      },
      RatingFrom: {
        allowNull: false,
        references: {
          model: 'User',
          key: 'UserId'
        },
        type: Sequelize.INTEGER
      },
      RatingTo: {
        allowNull: false,
        references: {
          model: 'User',
          key: 'UserId'
        },
        type: Sequelize.INTEGER
      },
      Ratings: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      Comments: {
        type: Sequelize.STRING
      },
      RatingDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      OnTimeArrival: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      Friendly: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      QualityOfService: {
        allowNull: false,
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('Rating');
  }
};