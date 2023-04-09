const Sequelize = require('sequelize');
const connection = require('../../database/database');


const countries = connection.define('countries', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descriptions: {
        type: Sequelize.STRING,
        allowNull: false
    },
    flag: {
        type: Sequelize.STRING,
        allowNull: false
    },
    englishTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    currency: {
        type: Sequelize.STRING,
        allowNull: false
    },
    currencySymbol: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

//countries.sync({ force: true });

module.exports = countries;