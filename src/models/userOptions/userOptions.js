const Sequelize = require('sequelize');
const connection = require('../../database/database');


const userOptions = connection.define('userOptions', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cityId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    when: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    budget: {
        type: Sequelize.STRING,
        allowNull: false
    },
    adsGroup: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

//userOptions.sync({ force: true });

module.exports = userOptions;