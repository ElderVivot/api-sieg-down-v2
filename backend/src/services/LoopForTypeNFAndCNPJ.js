const typeNFAndCNPJs = [{
    typeNF: 'nfe',
    typeCNPJ: 'cnpjDest'
}, {
    typeNF: 'nfe',
    typeCNPJ: 'cnpjEmit'
}]

class LoopForTypeNFAndCNPJ{
    constructor(cgce_emp, dateInicialAndFinalOfMonth, event){
        this.cgce_emp = cgce_emp
        this.dateInicialAndFinalOfMonth = dateInicialAndFinalOfMonth
        this.event = event
    }

    process(){
        for(let typeNFAndCNPJ of typeNFAndCNPJs){
            console.log(typeNFAndCNPJ)
        }
    }
}

module.exports = LoopForTypeNFAndCNPJ