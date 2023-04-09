const Sequelize = require('sequelize');
const connection = require('./../../database/database');


const emailVeridator = connection.define('emailVeridator', {
    token: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    used: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

//emailVeridator.sync({ force: false });

module.exports = emailVeridator;