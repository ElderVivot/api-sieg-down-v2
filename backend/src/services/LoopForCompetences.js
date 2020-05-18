const { returnMonthsOfYear, daysInitialAndEndOfMonth, zeroLeft } = require('../util/functions')
const LoopForTypeEvents = require('./LoopForTypeEvents')

class LoopForCompetences{
    constructor(monthInicial, yearInicial, monthFinal, yearFinal, settings){
        this.monthInicial = monthInicial
        this.yearInicial = yearInicial
        this.monthFinal = monthFinal
        this.yearFinal = yearFinal
        this.settings = settings
    }

    async process(){
        let year = this.yearInicial
        while(year <= this.yearFinal){
            const months = returnMonthsOfYear(year, this.monthInicial, this.yearInicial, this.monthFinal, this.yearFinal)
            
            for(let month of months){
                console.log(`\t- Iniciando processamento do mês ${zeroLeft(month, 2)}/${year}`)

                const dateInicialAndFinalOfMonth = daysInitialAndEndOfMonth(month, year)
                this.settings['month'] = month
                this.settings['year'] = year
                this.settings['dataInicio'] = dateInicialAndFinalOfMonth.dateInitial
                this.settings['dataFim'] = dateInicialAndFinalOfMonth.dateFinal

                const loopForTypeEvents = new LoopForTypeEvents(this.settings)
                await loopForTypeEvents.process()
            }

            year++
        }
    }
}

module.exports = LoopForCompetences