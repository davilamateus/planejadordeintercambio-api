const Sequelize = require('sequelize');
const connection = require('../../database/database');


const noticiesCategories = connection.define('noticiesCategories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

//noticiesCategories.sync({ force: false });

module.exports = noticiesCategories;