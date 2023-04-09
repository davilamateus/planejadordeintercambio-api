const Sequelize = require('sequelize');
const connection = require('../../database/database');
const countriesModels = require('../countries/countries');


const radios = connection.define('radios', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false
    },
    img: {
        type: Sequelize.STRING,
        allowNull: false
    },
    countryId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

radios.belongsTo(countriesModels);
countriesModels.hasMany(radios);

//radios.sync({ force: false });

module.exports = radios;