const express = require('express')
const app= express()

const port=3333

// Informando a aplicação Express que será usado o formato JSON para trasferir e receber dados
app.use(express.json())

// Aqui será implementada o grupo de rotas possíveis de serem utilizadas neste APP
// Estas rotas devem ser importadas com o uso do require()

// app.use(routes)


app.listen(port, ()  => console.log(`Seridor rodando na porta ${port}`))