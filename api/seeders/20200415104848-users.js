'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        firstName: 'Tomáš',
        lastName: 'Princ',
        phone: '721524113',
        email: 'princ.tomas@seznam.cz',
        position: 'Vedoucí',
        role: 'admin',
        birthDate: '1992-10-08',
        pwd: '123456',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    },
    {
      firstName: 'Petr',
      lastName: 'Žížala',
      phone: '***',
      email: 'example@example.com',
      position: 'Mechanik',
      role: '',
      birthDate: '2020-04-08',
      pwd: '123456',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
