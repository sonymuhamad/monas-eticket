"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tickets", [
      {
        name: "Ticket entrance monas",
        price: 5000,
        discount: 25,
        terms:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
        how_to_use:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
        createdAt: new Date(),
        updatedAt: new Date(),
        image: "lidah-api.png",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
      },
      {
        name: "Tiket Naik ke Puncak Monas",
        price: 1000,
        discount: 0,
        terms:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
        how_to_use:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
        createdAt: new Date(),
        updatedAt: new Date(),
        image: "lidah-api.png",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
      },
      {
        name: "Tiket Food Court",
        price: 50000,
        discount: 0,
        terms:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
        how_to_use:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
        createdAt: new Date(),
        updatedAt: new Date(),
        image: "lidah-api.png",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
      },
      {
        name: "Tiket Masuk Motor",
        price: 15000,
        discount: 50,
        terms:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
        how_to_use:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
        createdAt: new Date(),
        updatedAt: new Date(),
        image: "lidah-api.png",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tickets", null, {});
  },
};
