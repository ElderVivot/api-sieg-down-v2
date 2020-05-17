const axios = require('axios')

class RequestAPISIEG{
    constructor(dataRequest){
        this.dataRequest = dataRequest
        this.dataRequest['take'] = 50 // pega 50 notas
    }

    async process(){
        let data = []
        try {
            const response = await axios.post('https://api.sieg.com/aws/api-xml-search.ashx', this.dataRequest)
            data = response.data.xmls
        } catch (error) {
            console.log(error)
        }
        return data
    }
}

module.exports = RequestAPISIEG

// const dataRequest = {
//     apikey: '49wxHodcRPiPcEqDQAJuQg==',
//     email: 'erp@somacontabilidades.com.br',
//     dataInicio: '2020-01-01',
//     dataFim: '2020-01-31',
//     downloadevent: false,
//     xmltype: 'nfe',
//     cnpjDest: '03457169000163',
//     skip: 0,
//     take: 50
// }
// const requestAPISIEG = new RequestAPISIEG(dataRequest)
// requestAPISIEG.process().then( values => console.log(values))