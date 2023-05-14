"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("detail_transactions", {
      id_detail_transaction: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      price: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      discount: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("detail_transactions");
  },
};
