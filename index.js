
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conecction = require('./database/databse');
const Pergunta = require('./database/Pergunta');
const Resposta = require("./database/Resposta");
const { where } = require("sequelize");

conecction
    .authenticate()
    .then(()=>{
        console.log('Conexão feita com sucesso!');
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get("/",(req, res) => {
    Pergunta.findAll({raw: true, order:
        [[
            'id','DESC'
        ]]}).then(perguntas =>{
        res.render("index",{
            perguntas : perguntas
        });
    });
    });



app.get("/perguntar",(req, res)=>{
    res.render('perguntar');
})

app.post("/salvarpergunta",(req, res) =>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/");
    })
})
app.get("/pergunta/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const pergunta = await Pergunta.findOne({ where: { id: id } });

        if (!pergunta) {
            return res.send("Pergunta não encontrada!");
        }

        const respostas = await Resposta.findAll({
            where: { perguntaId: id },
            order: [['id', 'DESC']]
        });

        res.render("pergunta", {
            pergunta: pergunta,
            respostas: respostas
        });

    } catch (error) {
        console.error("Erro ao carregar a pergunta:", error);
        res.status(500).send("Erro interno no servidor.");
    }
});


app.post("/responder",(req, res) =>{
    var corpo = req.body.corpo; 
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId : perguntaId
    }).then(()=>{
        res.redirect("/pergunta/" + perguntaId)
    })
});

app.listen(8080,()=>{ console.log("App rodando!");});
