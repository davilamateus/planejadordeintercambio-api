const Sequelize = require('sequelize');
const connection = require('../../database/database');
const noticiesCategories = require('../noticiesCategories/noticiesCategories');
const Users = require('../users/users');


const finances = connection.define('finances', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    value: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

//finances.sync({ force: true });

finances.belongsTo(Users);
Users.hasMany(finances);

module.exports = finances;