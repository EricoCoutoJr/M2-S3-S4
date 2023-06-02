
//Neste arquivo enpacotamos todas as rotas em uma variável que será disponibilizada pelo server.js
// Instaciando a variável routes com a função express.Router()
const express = require('express')
const routers = express.Router()
const {processAct, diasMes, insertItem, filtrar, toUpDate} = require('../controllers/functions')

// Definindo uma das rotas
// A função de cada rota está disponível na pasta controllers - local das regras de negócio
// routes.verbo_http('/rota/usada', função a ser executada)
// Para chamar esta rota devemos usar o Query params /alterar/?nome1=3&nome2=1

routers.patch("/alterar", processAct)
routers.get("/dia", diasMes)
routers.post("/itens", insertItem)
routers.get('/filter', filtrar)
routers.put('/alterar/:id', toUpDate)


// Exportação do objeto routes para uso no server.js
module.exports = routers