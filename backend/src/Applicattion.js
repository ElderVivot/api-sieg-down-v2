// Link da documentação da api https://intercom.help/sieg/pt-BR/articles/2343240-download-de-xmls-em-lote

const { returnCompetenceStartEnd } = require('./util/functions')
const GetExtractCompanies = require('./services/GetExtractCompanies')
const LoopForCompetence = require('./services/LoopForCompetences')

// é necessário criar um arquivo dataApi.json com os dados da requisição, se o arquivo não existir
// seta configurações gerais. Pois este dataApi não vai subir pro gitHub
let dataApi = {}
try {
    dataApi = require('./dataApi.json')
} catch (error) {
    dataApi = {
        apikey: "apikeycorrect",
        email: "emailexample@email.com"
    }
}

class Applicattion{
    constructor(){
        this.getExtractCompanies = []
        this.competenceInicial = '01/2020'
        this.competenceFinal = '05/2020'
        this.competenceInicialAndFinal = returnCompetenceStartEnd(this.competenceInicial, this.competenceFinal)
        this.dataRequest = { ...dataApi } // vai conter os dados necessários pra fazer a requisição e alguns outros úteis pro procesamento
        // let dateNow = new Date()
        // dateNow.setMinutes(dateNow.getMinutes() - dateNow.getTimezoneOffset())
        this.dataRequest['dateHourInicialLog'] = new Date().toLocaleString('pt-BR', {timezone: "America/Sao_Paulo"})
    }

    async process() {
        let sequencial = 1

        this.getExtractCompanies = new GetExtractCompanies()
        const companies = await this.getExtractCompanies.getData()
        for(let companie of companies){
            console.log(`- Iniciando processamento da empresa ${companie['codi_emp']} - ${companie['nome_emp']}`)

            const cgce_emp = companie['cgce_emp']
            // ignora as empresas com CNPJ inválido
            if(cgce_emp === null || cgce_emp === "" || cgce_emp === "00000000000000"){
                continue
            }

            this.dataRequest['cgce_emp'] = cgce_emp
            this.dataRequest['codi_emp'] = companie['codi_emp']
            this.dataRequest['sequencial'] = sequencial
            
            const loopForCompetence = new LoopForCompetence(
                this.competenceInicialAndFinal.monthInicial,
                this.competenceInicialAndFinal.yearInicial,
                this.competenceInicialAndFinal.monthFinal,
                this.competenceInicialAndFinal.yearFinal,
                this.dataRequest
            )

            await loopForCompetence.process()
        }
    }
}

applicattion = new Applicattion()
applicattion.process()