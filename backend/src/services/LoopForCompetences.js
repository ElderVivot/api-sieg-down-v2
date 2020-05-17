const { returnMonthsOfYear, daysInitialAndEndOfMonth } = require('../util/functions')
const LoopForTypeEvents = require('./LoopForTypeEvents')

class LoopForCompetences{
    constructor(monthInicial, yearInicial, monthFinal, yearFinal, dataRequest){
        this.monthInicial = monthInicial
        this.yearInicial = yearInicial
        this.monthFinal = monthFinal
        this.yearFinal = yearFinal
        this.dataRequest = dataRequest
    }

    async process(){
        let year = this.yearInicial
        while(year <= this.yearFinal){
            const months = returnMonthsOfYear(year, this.monthInicial, this.yearInicial, this.monthFinal, this.yearFinal)
            
            for(let month of months){
                console.log(`\t- Iniciando processamento do mês ${month}/${year}`)

                const dateInicialAndFinalOfMonth = daysInitialAndEndOfMonth(month, year)
                this.dataRequest['month'] = month
                this.dataRequest['year'] = year
                this.dataRequest['dataInicio'] = dateInicialAndFinalOfMonth.dateInitial
                this.dataRequest['dataFim'] = dateInicialAndFinalOfMonth.dateFinal

                const loopForTypeEvents = new LoopForTypeEvents(this.dataRequest)
                await loopForTypeEvents.process()
            }

            year++
        }
    }
}

module.exports = LoopForCompetences