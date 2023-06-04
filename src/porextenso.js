
const unidades = [
  "",
  "um",
  "dois",
  "três",
  "quatro",
  "cinco",
  "seis",
  "sete",
  "oito",
  "nove",
  "dez",
  "onze",
  "doze",
  "treze",
  "quatorze",
  "quinze",
  "dezesseis",
  "dezessete",
  "dezoito",
  "dezenove",
]
const dezenas = [
  "",
  "",
  "vinte",
  "trinta",
  "quarenta",
  "cinquenta",
  "sessenta",
  "setenta",
  "oitenta",
  "noventa"
];
const centenas = [
  "cento",
  "duzentos",
  "trezentos",
  "quatrocentos",
  "quinhentos",
  "seiscentos",
  "setecentos",
  "oitocentos",
  "novecentos"
]

const notacao =[ 
  ["",""],
  ["mil","mil"],
  ["milhão","milhões"],
  ["bilhão", "bilhões"],
  ["trilhão", "trilhões"]
]
// Esta função veirifica de o valor é ou não negativo em função do sinal "-"
function isNeg(numero){
  let numberIn = numero.split('')
  if (numberIn[0] == '-'){
    return true
  }
  return false
}

// Esta função interpreta apenas números de 3 digitos
function read999(number){
  let resposta = ''
  let num = parseInt(number,10)
  if(number == '000'){
    return ''
  }
  if(num === 0 ){
    resposta = unidades[num]
  }
  if(num < 20){
    resposta = unidades[num]
  }
  if (num > 19 && num < 100){
    let un = num % 10
    let dez = Math.floor((num / 10)-1)
    resposta = dezenas[dez] + (un > 0 ? " e " +unidades[un]:"")
  }
  if (num > 99 && num < 1000){
    let un = num % 10
    let dez = Math.floor(((num % 100) /10))
    let cent = Math.floor((num /100)-1)
    if (un === 0 && dez === 0){
      resposta = centenas[cent]
    } else if (un !== 0 && dez === 1){
      resposta = centenas[cent] + " e "+unidades[dez*10+un]
    } else if (un === 0 && dez === 1){
      resposta = centenas[cent] + " e " + unidades[dez*10]
    } else {
      resposta = centenas[cent] + " e "+dezenas[dez]+" e "+unidades[un]
    }
  }
  return resposta
}

// A função sliceArr() fatia o numero em blocos de 3 digitos e se
// o ultimo bloco tiver menos de 3 digitos é aguregado como o que tiver.
function sliceArr(number){
  let slicedBy3 = []
  let numberIn = number.split('')
  if (numberIn[0] == '-'){
    numberIn.shift()
  }
  for (let i = numberIn.length; i >= 0; i -= 3) {
    slicedBy3.push(numberIn.slice(i, i + 3).join(''));
  }
  let rest = parseInt(numberIn.length) % 3
  if(!rest == 0){
      slicedBy3.push(numberIn.slice(0, rest).join(''))
  }
  return slicedBy3;
}

function isAValidNum(number){
  let numberIn = number.split('')
  if( numberIn.length > 15){
    return false
  } else {
    return true
  }
}

// no módule de exportação é montado o texto final para retornar a mensagem do 
// número por extenso
module.exports ={
  async porextenso(request,response){
    let numero = request.body.num
    if (isAValidNum(numero)){
      return response.status(400).send(
        {"erro": "Valor invalido",
         "resposta": "Limite de valor é entre -999999999999999 a 999999999999999" })
    }
    const sliced = sliceArr(numero)
    console.log(sliced)
    extenso = ""
    escala = ""
    for (let index = 1; index < sliced.length; index++) {
        if(sliced[index] == 0){
          escala =''
        } else {
          if (sliced[index] == 1){
            escala = notacao[index - 1][0]
          } else {
            escala = notacao[index - 1][1]
          }
        }
        extenso = `${read999(sliced[index])} ${escala} ${extenso}` 
      }
      if (isNeg(numero)){
        extenso = "menos " + extenso
      }
    return response.status(200).send(
      {"resposta": extenso })
  }
}