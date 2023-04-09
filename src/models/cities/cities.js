const Sequelize = require('sequelize');
const connection = require('../../database/database');
const countriesModels = require('./../countries/countries');


const cities = connection.define('cities', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descriptions: {
        type: Sequelize.STRING,
        allowNull: false
    },
    img: {
        type: Sequelize.STRING,
        allowNull: false
    },
    englishTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    airport: {
        type: Sequelize.STRING,
        allowNull: false
    },
    countryId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

cities.belongsTo(countriesModels);
countriesModels.hasMany(cities);

//cities.sync({ force: false });

module.exports = cities;