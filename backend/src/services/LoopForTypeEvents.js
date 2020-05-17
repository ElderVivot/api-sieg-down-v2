const LoopForTypeNFAndCNPJ = require('./LoopForTypeNFAndCNPJ')

const typeEvents = [{
    events: true
}, {
    events: false
}]

class LoopForTypeEvents{
    constructor(dataRequest){
        this.dataRequest = dataRequest
    }

    async process(){
        for(let typeEvent of typeEvents){
            const event = typeEvent['events']

            console.log(`\t\t- Iniciando processamento dos tipos dos eventos ${event}`)

            this.dataRequest['downloadevent'] = event

            const loopForTypeNFAndCNPJ = new LoopForTypeNFAndCNPJ(this.dataRequest)
            await loopForTypeNFAndCNPJ.process()
        }
    }
}

module.exports = LoopForTypeEvents