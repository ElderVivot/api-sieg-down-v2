// Link da documentação da api https://intercom.help/sieg/pt-BR/articles/2343240-download-de-xmls-em-lote

const { returnCompetenceStartEnd } = require('./util/functions')
const GetExtractCompanies = require('./services/GetExtractCompanies')
const LoopForCompetence = require('./services/LoopForCompetences')
const PostProcessFrequency = require('./services/PostProcessFrequency')

// é necessário criar um arquivo settings.json com os dados da requisição, se o arquivo não existir
// seta configurações gerais. Pois este settings não vai subir pro gitHub
let settings = {}
try {
    settings = require('./settings.json')
} catch (error) {
    settings = {
        apikey: "apikeycorrect",
        email: "emailexample@email.com",
        wayToSaveXMLs: "C:/notas_fiscais"
    }
}

class Applicattion{
    constructor(){
        this.getExtractCompanies = []
        this.competenceInicial = '01/2020'
        this.competenceFinal = '05/2020'
        this.competenceInicialAndFinal = returnCompetenceStartEnd(this.competenceInicial, this.competenceFinal)
        this.settings = { ...settings } // vai conter os dados necessários pra fazer a requisição e alguns outros úteis pro procesamento
        // let dateNow = new Date()
        // dateNow.setMinutes(dateNow.getMinutes() - dateNow.getTimezoneOffset())
        this.settings['dateHourInicialLog'] = new Date().toLocaleString('pt-BR', {timezone: "America/Sao_Paulo"})
        this.sequencial = 1
    }

    async process() {
        const dateHourInicialProcessLog = new Date().toLocaleString('pt-BR', {timezone: "America/Sao_Paulo"})

        this.getExtractCompanies = new GetExtractCompanies()
        const companies = await this.getExtractCompanies.getData()
        for(let companie of companies){
            console.log(`- Iniciando processamento da empresa ${companie['codi_emp']} - ${companie['nome_emp']} | Loop ${this.sequencial}`)

            const cgce_emp = companie['cgce_emp']
            // ignora as empresas com CNPJ inválido
            if(cgce_emp === null || cgce_emp === "" || cgce_emp === "00000000000000"){
                continue
            }

            this.settings['cgce_emp'] = cgce_emp
            this.settings['codi_emp'] = companie['codi_emp']
            this.settings['nome_emp'] = companie['nome_emp']
            this.settings['sequencial'] = this.sequencial
            
            const loopForCompetence = new LoopForCompetence(
                this.competenceInicialAndFinal.monthInicial,
                this.competenceInicialAndFinal.yearInicial,
                this.competenceInicialAndFinal.monthFinal,
                this.competenceInicialAndFinal.yearFinal,
                this.settings
            )

            await loopForCompetence.process()
        }

        const dateHourFinalProcessLog = new Date().toLocaleString('pt-BR', {timezone: "America/Sao_Paulo"})

        const postProcessFrequency = new PostProcessFrequency({ 
            dateHourInicialLog: this.settings['dateHourInicialLog'],
            sequencial: this.sequencial,
            dateHourInicialProcessLog,
            dateHourFinalProcessLog
        })
        await postProcessFrequency.postData()

        this.sequencial++
    }
}

applicattion = new Applicattion()

function loopExportNotas(){
    return new Promise((resolve, reject) => {
        setTimeout( async () => {
            try {
                resolve(await applicattion.process())
                loopExportNotas()
            } catch (error) {
                reject('- Erro no loop de exportação das notas' + error)                
                loopExportNotas() // mesmo com o erro vai tentar executar novamente
            }
        }, 1000);
    })
}

loopExportNotas().then(() => console.log('')).catch(error => console.log(error))

// const execExportNotas = async () => {
//     await loopExportNotas()
// }
  
// execExportNotas()