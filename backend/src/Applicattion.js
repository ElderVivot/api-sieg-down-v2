const GetExtractCompanies = require('./services/GetExtractCompanies')

class Applicattion{
    constructor(){
        this.getExtractCompanies = []
        this.competenceInicial = '01/2020'
        this.competenceFinal = '05/2020'
    }

    async process() {
        this.getExtractCompanies = new GetExtractCompanies()
        const companies = await this.getExtractCompanies.getData()
        console.log(companies)
    }
}

applicattion = new Applicattion()
applicattion.process()