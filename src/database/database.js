const Sequelize = require('sequelize');


const connection = new Sequelize('u225794026_planejador', 'u225794026_planejador', 'Goias123.', {
    host: '45.152.44.103',
    dialect: 'mysql',

});


module.exports = connection;