const Sequelize = require('sequelize');
const connection = require('../../database/database');


const newPassword = connection.define('newPassword', {
    token: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    used: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

//newPassword.sync({ force: true });

module.exports = newPassword;