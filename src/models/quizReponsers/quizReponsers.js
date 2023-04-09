const Sequelize = require('sequelize');
const connection = require('../../database/database');
const userModel = require('./../users/users');


const quizReponsers = connection.define('quizReponsers', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    response1: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    response1_1: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    response2: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    response3: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    response4: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    response5: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    response6: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    response7: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

quizReponsers.belongsTo(userModel);
userModel.hasOne(quizReponsers);


//quizReponsers.sync({ force: true });

module.exports = quizReponsers;