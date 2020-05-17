const RequestAPISIEG = require('./RequestAPISIEG')

class LoopForSkip{
    constructor(dataRequest){
        this.dataRequest = dataRequest
        this.skip = 0
        this.qtdNotas = undefined
    }

    async process(){
        this.dataRequest['skip'] = this.skip
        const requestAPISIEG = new RequestAPISIEG(this.dataRequest)
        const notes = await requestAPISIEG.process()        
        console.log(notes)
        return notes
    }
}

module.exports = LoopForSkip