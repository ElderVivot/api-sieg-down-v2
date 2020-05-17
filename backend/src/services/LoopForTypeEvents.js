const LoopForTypeNFAndCNPJ = require('./LoopForTypeNFAndCNPJ')

const typeEvents = [{
    events: true
}, {
    events: false
}]

class LoopForTypeEvents{
    constructor(cgce_emp, dateInicialAndFinalOfMonth){
        this.cgce_emp = cgce_emp
        this.dateInicialAndFinalOfMonth = dateInicialAndFinalOfMonth
    }

    process(){
        for(let typeEvent of typeEvents){
            const event = typeEvent['events']

            const loopForTypeNFAndCNPJ = new LoopForTypeNFAndCNPJ(this.cgce_emp, this.dateInicialAndFinalOfMonth, event)
            loopForTypeNFAndCNPJ.process()
        }
    }
}

module.exports = LoopForTypeEvents