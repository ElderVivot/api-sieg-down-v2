const { returnMonthsOfYear, daysInitialAndEndOfMonth } = require('../util/functions')
const LoopForTypeEvents = require('./LoopForTypeEvents')

class LoopForCompetences{
    constructor(monthInicial, yearInicial, monthFinal, yearFinal, companie){
        this.monthInicial = monthInicial
        this.yearInicial = yearInicial
        this.monthFinal = monthFinal
        this.yearFinal = yearFinal
        this.companie = companie
    }

    process(){
        let year = this.yearInicial
        while(year <= this.yearFinal){
            const months = returnMonthsOfYear(year, this.monthInicial, this.yearInicial, this.monthFinal, this.yearFinal)
            
            for(let month of months){
                const dateInicialAndFinalOfMonth = daysInitialAndEndOfMonth(month, year)

                const loopForTypeEvents = new LoopForTypeEvents(this.companie, dateInicialAndFinalOfMonth)
                loopForTypeEvents.process()
            }

            year++
        }
    }
}

module.exports = LoopForCompetences