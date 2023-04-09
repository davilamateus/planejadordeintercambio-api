const Sequelize = require('sequelize');
const connection = require('../../database/database');
const noticiesCategories = require('../noticiesCategories/noticiesCategories');


const noticies = connection.define('noticies', {
    noticiesCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
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
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    countryId: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

//noticies.sync({ force: true });

noticies.belongsTo(noticiesCategories);
noticiesCategories.hasMany(noticies);

module.exports = noticies;