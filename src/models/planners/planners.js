const Sequelize = require('sequelize');
const connection = require('../../database/database');
const Users = require('../users/users');
const plannersSuggestions = require('../plannersSuggestions/plannersSuggestions');


const planners = connection.define('planners', {
    userId: {
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
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    position: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.BIGINT,
        allowNull: false
    }

});

//planners.sync({ force: true });

planners.belongsTo(Users);
Users.hasMany(planners)

module.exports = planners;