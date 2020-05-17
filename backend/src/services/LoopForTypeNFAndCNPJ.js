const LoopForSkip = require('./LoopForSkip')

const typeNFAndCNPJs = [{
    typeNF: 'nfe',
    typeCNPJ: 'cnpjDest'
}, {
    typeNF: 'nfe',
    typeCNPJ: 'cnpjEmit'
}]

class LoopForTypeNFAndCNPJ{
    constructor(dataRequest){
        this.dataRequest = dataRequest
    }

    async process(){
        for(let typeNFAndCNPJ of typeNFAndCNPJs){
            console.log(`\t\t\t- Iniciando processamento ${typeNFAndCNPJ['typeNF']} - ${typeNFAndCNPJ['typeCNPJ']}`)

            let dataRequest = { ...this.dataRequest }

            dataRequest['typeNF'] = typeNFAndCNPJ['typeNF']
            dataRequest['typeCNPJ'] = typeNFAndCNPJ['typeCNPJ']

            const loopForSkip = new LoopForSkip(dataRequest)
            return await loopForSkip.process()
        }
    }
}

module.exports = LoopForTypeNFAndCNPJ