function returnCompetenceStartEnd(competenceInicial, competenceFinal){
    const objData = {}
    try {
        const competenceInicialSplit = competenceInicial.split('/')
        objData['monthInicial'] = parseInt(competenceInicialSplit[0])
        objData['yearInicial'] = parseInt(competenceInicialSplit[1])
    } catch (error) {
        objData['monthInicial'] = 5
        objData['yearInicial'] = 2020
    }

    try {
        const competenceFinalSplit = competenceFinal.split('/')
        objData['monthFinal'] = parseInt(competenceFinalSplit[0])
        objData['yearFinal'] = parseInt(competenceFinalSplit[1])
    } catch (error) {
        objData['monthFinal'] = 5
        objData['yearFinal'] = 2020
    }
    
    return objData
}
module.exports.returnCompetenceStartEnd = returnCompetenceStartEnd

function returnMonthsOfYear(year, filterMonthStart, filterYearStart, filterMonthEnd, filterYearEnd){
    let months = []
    if(filterYearStart > filterYearEnd || ( filterYearStart === filterYearEnd && filterMonthStart > filterMonthEnd) ){
        return [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
    }

    if(year == filterYearStart && year == filterYearEnd){
        while(filterMonthStart <= filterMonthEnd){
            months.push(filterMonthStart)
            filterMonthStart++
        }
        return months
    } else if(year == filterYearStart){
        while(filterMonthStart <= 12){
            months.push(filterMonthStart)
            filterMonthStart++
        }
        return months
    } else if(year == filterYearEnd){
        let inicial = 1
        while(inicial <= filterYearEnd){
            months.push(inicial)
            inicial++
        }
        return months
    } else {
        return [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
    }
}
module.exports.returnMonthsOfYear = returnMonthsOfYear

const zeroLeft = (valueInsert, countZeros=2) => {
    return ("0000".repeat(countZeros) + valueInsert).slice(-countZeros)
}
module.exports.zeroLeft = zeroLeft

const daysInitialAndEndOfMonth = (month, year) => {
    const dateInitial = new Date(year, month-1, 1)
  
    const dateEnd = new Date(year, month, 0)
    
    return{
        dateInitial: `${dateInitial.getFullYear()}-${zeroLeft(dateInitial.getMonth()+1)}-${zeroLeft(dateInitial.getDate())}`, 
        dateEnd: `${dateEnd.getFullYear()}-${zeroLeft(dateEnd.getMonth()+1)}-${zeroLeft(dateEnd.getDate())}`
    }
}
module.exports.daysInitialAndEndOfMonth = daysInitialAndEndOfMonth
