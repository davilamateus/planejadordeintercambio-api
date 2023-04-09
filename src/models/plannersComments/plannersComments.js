const Sequelize = require('sequelize');
const connection = require('../../database/database');
const planners = require('../planners/planners');


const plannersComments = connection.define('plannersComments', {
    plannerId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

});

plannersComments.belongsTo(planners);
planners.hasMany(plannersComments);

//plannersComments.sync({ force: true });

module.exports = plannersComments;