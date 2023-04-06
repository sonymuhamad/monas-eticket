'use strict';
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('admin', [
      {
        username: 'fadhil',
        email: 'namaakusony@gmail.com',
        password: await bcrypt.hash('918256', 10)
      },
      {
        username: 'Lucia',
        email: 'namaguasony@gmail.com',
        password: await bcrypt.hash('918256', 10)
      },
      {
        username: 'LuciaSony',
        email: 'acungptabals@gmail.com',
        password: await bcrypt.hash('918256', 10)
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admin', null, {})
  }
};
