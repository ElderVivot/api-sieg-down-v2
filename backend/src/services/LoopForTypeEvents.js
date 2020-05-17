const typeEvents = [{
    events: true
}, {
    events: false
}]

class LoopForTypeEvents{
    constructor(companie, dateInicialAndFinalOfMonth){
        this.companie = companie
        this.dateInicialAndFinalOfMonth = dateInicialAndFinalOfMonth
    }

    process(){
        for(let typeEvent of typeEvents){
            console.log(typeEvent)
        }
    }
}

module.exports = LoopForTypeEvents