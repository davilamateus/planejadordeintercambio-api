const Sequelize = require('sequelize');
const connection = require('../../database/database');
const planners = require('../planners/planners');


const plannersAttachments = connection.define('plannersAttachments', {
    plannerId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

plannersAttachments.belongsTo(planners);
planners.hasMany(plannersAttachments);

//plannersAttachments.sync({ force: true });

module.exports = plannersAttachments;