'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('admin', [
      {
        username: 'Sony',
        email: 'sony@gmail.com',
        password: '910292'
      },
      {
        username: 'Lucia',
        email: 'lucia@gmail.com',
        password: '910292'
      },
      {
        username: 'LuciaSony',
        email: 'luciasony@gmail.com',
        password: '910292'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('admin', null, {})
  }
};