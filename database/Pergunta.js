const Sequelize = require('sequelize');
const conecction = require('./databse');

const Pergunta = conecction.define('pergunta',{
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(()=>{
    console.log('Tabela criada!')
});

module.exports = Pergunta;