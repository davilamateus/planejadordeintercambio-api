const Sequelize = require('sequelize');
const connection = require('../../database/database');
const planners = require('../planners/planners');


const plannersSteps = connection.define('plannersSteps', {
    plannerId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

plannersSteps.belongsTo(planners);
planners.hasMany(plannersSteps);

//plannersSteps.sync({ force: true });

module.exports = plannersSteps;