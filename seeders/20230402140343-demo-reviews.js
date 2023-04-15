'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('reviews', [
      {
        name: "Bu Tia",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis praesentium velit quam in nisi, facilis odit eum accusantium quas excepturi labore tempore nemo recusandae accusamus sequi eveniet id vitae dolorum.",
        avatar: "ibu-anak-selfie.jpeg",
      },
      {
        name: "Mas Cahyo",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
        avatar: "foto-di-monas-jpg",
      },
      {
        name: "Puan Maharani",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta odio, quis consectetur deserunt tempora dolore quaerat iste sequi placeat enim? Pariatur, nemo? Aut aliquid id sit corrupti, eum ducimus.",
        avatar: "selfie.jpg"
      }
    ])

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reviews', null, {})
  }
};
