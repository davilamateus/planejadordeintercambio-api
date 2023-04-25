const Sequelize = require('sequelize');
const connection = require('../../database/database');


const practiceLanguage = connection.define('practiceLanguage', {
    language: {
        type: Sequelize.STRING,
        allowNull: false
    },
    original: {
        type: Sequelize.STRING,
        allowNull: false
    },
    portuguese: {
        type: Sequelize.STRING,
        allowNull: false
    }

});



//practiceLanguage.sync({ force: false });

module.exports = practiceLanguage;