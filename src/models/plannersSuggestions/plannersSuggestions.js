const Sequelize = require('sequelize');
const connection = require('../../database/database');
const planners = require('../planners/planners');


const plannersSuggestions = connection.define('plannersSuggestions', {
    plannerId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    countryId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});




//plannersSuggestions.sync({ force: true });

module.exports = plannersSuggestions;