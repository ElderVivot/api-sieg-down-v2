const LoopForSkip = require('./LoopForSkip')

const typeNFAndCNPJs = [{
    typeNF: 'nfe',
    typeCNPJ: 'cnpjDest'
}, {
    typeNF: 'nfe',
    typeCNPJ: 'cnpjEmit'
}, {
    typeNF: 'cte',
    typeCNPJ: 'cnpjTom'
}, {
    typeNF: 'cte',
    typeCNPJ: 'cnpjEmit'
}, {
    typeNF: 'nfce',
    typeCNPJ: 'cnpjEmit'
}]

class LoopForTypeNFAndCNPJ{
    constructor(settings){
        this.settings = settings
    }

    async process(){
        for(let typeNFAndCNPJ of typeNFAndCNPJs){
            console.log(`\t\t\t- Iniciando processamento ${typeNFAndCNPJ['typeNF']} - ${typeNFAndCNPJ['typeCNPJ']}`)

            let settings = { ...this.settings }

            settings['typeNF'] = typeNFAndCNPJ['typeNF']
            settings['typeCNPJ'] = typeNFAndCNPJ['typeCNPJ']

            const loopForSkip = new LoopForSkip(settings)
            await loopForSkip.process()
        }
    }
}

module.exports = LoopForTypeNFAndCNPJ