const { request } = require("express")
const { dateList, readData, writeData } = require("../utils")

// Nas funções serão implementadas as regras de negócio e serão usadas pelas rotas em routers.js

// A função a baixo troca posição da lista fixa
let list = ["Pedro", "José", "Aderbal", "Danilo", "Luisa","Vitoria"]


module.exports ={
  async processAct(request,response) {
    try {
      const {name1, name2} = request.body
      
      if (!(name1 || name2)){
        response.status(400).send('Um ou mais nomes não foram informados.')
      }
      let posName1 = list.indexOf(name1)
      let posName2 = list.indexOf(name2)
      if ((posName1 || posName2)) {
        response.status(400).send('Um ou mais nomes não constam na lista.')
      }
      let newList = [...list]
      newList[posName1] = list[posName2]
      newList[posName2] = list[posName1]
      response.status(200).send({ oldList: list, newList: newList})
      response.status(200).send('teste de função')
    } catch (error) {
      response.status(500).send(error)
    }
  },
  async diasMes(request, response) {
    try {
      const { mes, ano } = request.body
      if (!(mes || ano)) {
        response.status(400).send({"mensagem": 'Mês ou ano não informado.'})
      }
      if (dateList(mes, ano)) {
        response.status(200).send({"datelist": dateList(mes, ano)})
      } else {
        response.status(400).send({"mensagem": 'Mês tem que ser um valor entre 1 e 12'})
      }
    } catch (error){
      response.status(500).send(error)
    }
  },
  
  async insertItem(request, response) {
    const { item } = request.body
    const fileName = "src/data/itens.json"

    if (!item){
      return response.status(400).send({ mensagem: 'Não foi enviado item para inclusão'})
    }

    let itens = readData(fileName)
    if (!itens) {
      writeData(fileName, [{ item }])
      return response.status(200).send({
        mensagem: "Adicionou um item.", 
        dado: item
      })
    }
    itens = [...itens, {item}]
    writeData(fileName, itens)
    return response.status(200).send({
      mensagem: "Adicionou mais um item.",
      dado: item})

  },
  async filtrar(request,response) {
    users = readData('src/data/user.json')
    const { ageMin, ageMax, state, job} = request.query
    console.log(ageMin, ageMax, state, job)
    if((!ageMin) && (!ageMax) && (!state) && (!job)){
      return response.status(400).send({ mensagem: 'É necessário o uso de um dos parâmetros.',
                                          erro: 'Requisição inválida. Sem parâmetros.'})
    }
    let usersFiltrados = users.filter(user => {
      if (ageMin && user.age < parseInt(ageMin)) {
        return false;
      }
      if (ageMax && user.age > parseInt(ageMax)) {
        return false;
      }
      if (state && !user.state.toLowerCase().includes(state.toLowerCase())) {
        return false;
      }
      if (job && !pessoa.job.toLowerCase().includes(job.toLowerCase())) {
        return false;
      }
      return true;
    });
    return response.status(200).send({mensagem: usersFiltrados})
  }
}
  
  
