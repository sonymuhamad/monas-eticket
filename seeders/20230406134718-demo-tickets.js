'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tickets", [
      {
        name: "Ticket entrance monas",
        price: 5000,
        terms: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
        how_to_use: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Tiket Naik ke Puncak Monas",
        price: 1000,
        terms: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
        how_to_use: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Tiket Food Court",
        price: 50000,
        terms: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
        how_to_use: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Tiket Masuk Motor",
        price: 15000,
        terms: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
        how_to_use: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete("tickets", null, {})
  }
};
