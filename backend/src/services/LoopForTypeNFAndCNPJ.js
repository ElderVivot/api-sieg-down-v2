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

    process(){
        for(let typeNFAndCNPJ of typeNFAndCNPJs){
            let dataRequest = { ...this.dataRequest }

            const typeCNPJ = typeNFAndCNPJ['typeCNPJ']

            dataRequest['xmltype'] = typeNFAndCNPJ['typeNF']
            dataRequest[typeNFAndCNPJ['typeCNPJ']] = dataRequest['cgce_emp']
            delete dataRequest.cgce_emp

            console.log(dataRequest)
        }
    }
}

module.exports = LoopForTypeNFAndCNPJ