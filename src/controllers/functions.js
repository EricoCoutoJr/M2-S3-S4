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
      let newList = [...list]
      newList[posName1] = list[posName2]
      newList[posName2] = list[posName1]
      console.log(list, newList)
      response.status(200).send({ oldList: list, newList: newList})
      response.status(200).send('teste de função')
    } catch (error) {
      response.status(500).send()
    }
  }
}
  
  
