const Sequelize = require('sequelize');
 const conecction = new Sequelize('guiaperguntas', 'root','',{
    host: 'localhost',
    dialect: 'mysql'
 });

 module.exports = conecction;