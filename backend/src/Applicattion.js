const { returnCompetenceStartEnd } = require('./util/functions')
const GetExtractCompanies = require('./services/GetExtractCompanies')
const LoopForCompetence = require('./services/LoopForCompetences')

class Applicattion{
    constructor(){
        this.getExtractCompanies = []
        this.competenceInicial = '01/2020'
        this.competenceFinal = '05/2020'
        this.competenceInicialAndFinal = returnCompetenceStartEnd(this.competenceInicial, this.competenceFinal)
    }

    async process() {
        this.getExtractCompanies = new GetExtractCompanies()
        const companies = await this.getExtractCompanies.getData()
        for(let companie of companies){

            const cgce_emp = companie['cgce_emp']
            // ignora as empresas com CNPJ inválido
            if(cgce_emp === null || cgce_emp === "" || cgce_emp === "00000000000000"){
                continue
            }
            const loopForCompetence = new LoopForCompetence(
                this.competenceInicialAndFinal.monthInicial,
                this.competenceInicialAndFinal.yearInicial,
                this.competenceInicialAndFinal.monthFinal,
                this.competenceInicialAndFinal.yearFinal,
                companie
            )

            loopForCompetence.process()
        }
    }
}

applicattion = new Applicattion()
applicattion.process()