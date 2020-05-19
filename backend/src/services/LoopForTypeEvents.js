const LoopForTypeNFAndCNPJ = require('./LoopForTypeNFAndCNPJ')

const typeEvents = [{
    events: true
}, {
    events: false
}]

class LoopForTypeEvents{
    constructor(settings){
        this.settings = settings
    }

    async process(){
        const promisses = []
        for(let typeEvent of typeEvents){
            const event = typeEvent['events']

            console.log(`\t\t- Iniciando processamento dos tipos dos eventos ${event}`)

            this.settings['downloadevent'] = event

            const loopForTypeNFAndCNPJ = new LoopForTypeNFAndCNPJ(this.settings)
            promisses.push(loopForTypeNFAndCNPJ.process())
        }
        await Promise.all(promisses)
    }
}

module.exports = LoopForTypeEvents