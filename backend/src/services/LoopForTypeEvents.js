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

    process(){
        for(let typeEvent of typeEvents){
            const event = typeEvent['events']
            this.dataRequest['downloadevent'] = event

            const loopForTypeNFAndCNPJ = new LoopForTypeNFAndCNPJ(this.dataRequest)
            loopForTypeNFAndCNPJ.process()
        }
    }
}

module.exports = LoopForTypeEvents