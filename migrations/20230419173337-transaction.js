"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transactions", {
      id_transaction: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      email_customer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      payment_valid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      payment_transaction_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email_verification_code: {
        type: Sequelize.STRING,
        allowNull: false,
        set() {
          const random = Math.floor(Math.random() * (1000000 - 10) + 10);
          this.setDataValue("email_verification_code", random);
        },
        createdAt: {
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.DataTypes.NOW,
        },
        updatedAt: {
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.DataTypes.NOW,
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("transactions");
  },
};
