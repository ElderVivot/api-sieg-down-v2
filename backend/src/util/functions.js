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
        while(inicial <= filterMonthEnd){
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
    const dateFinal = new Date(year, month, 0)
    
    return{
        dateInitial: `${dateInitial.getFullYear()}-${zeroLeft(dateInitial.getMonth()+1)}-${zeroLeft(dateInitial.getDate())}`, 
        dateFinal: `${dateFinal.getFullYear()}-${zeroLeft(dateFinal.getMonth()+1)}-${zeroLeft(dateFinal.getDate())}`
    }
}
module.exports.daysInitialAndEndOfMonth = daysInitialAndEndOfMonth

function implementsFilterInURL(baseURL='', filter={}){
    let url = `${baseURL}?`
    for (let [key, value] of Object.entries(filter)) {
        url += `${key}=${value}&`
    }
    return url
}
module.exports.implementsFilterInURL = implementsFilterInURL

function returnDataInDictOrArray(data, array, valueDefault=''){
    try {
        if(array.length === 1){
            return data[array[0]]
        } else if(array.length === 2){
            return data[array[0]][array[1]]
        } else if(array.length === 3){
            return data[array[0]][array[1]][array[2]]
        } else if(array.length === 4){
            return data[array[0]][array[1]][array[2]][array[3]]
        } else if(array.length === 5){
            return data[array[0]][array[1]][array[2]][array[3]][array[4]]
        } else if(array.length === 6){
            return data[array[0]][array[1]][array[2]][array[3]][array[4]][array[5]]
        } else if(array.length === 7){
            return data[array[0]][array[1]][array[2]][array[3]][array[4]][array[5]][array[6]]
        } else if(array.length === 8){
            return data[array[0]][array[1]][array[2]][array[3]][array[4]][array[5]][array[6]][array[7]]
        } else {
            return valueDefault
        }
    } catch (error) {
        return valueDefault
    }
}
module.exports.returnDataInDictOrArray = returnDataInDictOrArray

function minimalizeSpaces (text) {
    let result = text
    while (result.indexOf('  ') >= 0) {
        result = result.replace('  ', ' ')
    }
    return result.trim()
}

function treateTextField (value) {
    const result = value.trim().normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z ])/g, '').toUpperCase()
    return minimalizeSpaces(result)
}
module.exports.treateTextField = treateTextField