const { returnMonthsOfYear } = require('../util/functions')

class LoopForCompetences{
    constructor(monthInicial, yearInicial, monthFinal, yearFinal){
        this.monthInicial = monthInicial
        this.yearInicial = yearInicial
        this.monthFinal = monthFinal
        this.yearFinal = yearFinal
    }

    process(){
        let year = this.yearInicial
        while(year <= this.yearFinal){
            const months = returnMonthsOfYear(year, this.monthInicial, this.yearInicial, this.monthFinal, this.yearFinal)
            
            for(let month of months){
                console.log(`${month}/${year}`)
            }

            year++
        }
    }
}

module.exports = LoopForCompetences