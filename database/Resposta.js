const Sequelize = require('sequelize');
const conecction = require('./databse');

const Resposta = conecction.define("respostas",{
    corpo : {
        type : Sequelize.TEXT,
        allowNull: false

    },
    perguntaId : {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})
 Resposta.sync({force : false});

 module.exports = Resposta;