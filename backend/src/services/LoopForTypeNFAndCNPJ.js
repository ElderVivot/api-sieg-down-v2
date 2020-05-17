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

            dataRequest['xmltype'] = typeNFAndCNPJ['typeNF']
            dataRequest[typeNFAndCNPJ['typeCNPJ']] = dataRequest['cgce_emp']
            delete dataRequest.cgce_emp

            const loopForSkip = new LoopForSkip(dataRequest)
            return await loopForSkip.process()
        }
    }
}

module.exports = LoopForTypeNFAndCNPJ