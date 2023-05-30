exports.validaEmail = (email) => {
    // este regex e para validar email com domínio .com, .br, .net, etc
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (regex.test(email)) {
        return true
    }
    return false;
  }

exports.dateList = ( mes, ano) => {
        const month = [1,2,3,4,5,6,7,8,9,10,11,12]
        const listDays = []
        if (month.includes(mes)){
            let lastDay = new Date(ano, mes, 0);
            lastDay = lastDay.getDate()
            for (let dia = 1; dia < lastDay+1; dia++) {
                day = dia+'/'+mes+'/'+ano
                listDays.push(day);
            }
            return listDays
        } else {
            null
        }
    }