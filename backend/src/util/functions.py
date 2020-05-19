import os

def readSql(wayFile, nameSql, *args):
    # esta função lê um SQL e retorna como string com os *args aplicados. Pro arg ser aplicado tem que colocar um '#' no lugar, 
    # que ele deve fazer a substituição
    sql = ''
    argSequencial = 0
    try:
        with open(os.path.join(wayFile, nameSql), 'rt') as sqlfile:
            for row in sqlfile:
                positionInicialSearchNewHashtag = 0
                rowWithArguments = ''
                positionFindHashtag = row.find('#')
                rowSplit = row
                if positionFindHashtag >= 0:
                    while True:
                        rowWithArguments += f'{rowSplit[:positionFindHashtag]}{args[argSequencial]}'
                        positionInicialSearchNewHashtag = positionFindHashtag+1
                        rowSplit = rowSplit[positionInicialSearchNewHashtag:]
                        positionFindHashtag = rowSplit.find('#')
                        if positionFindHashtag < 0:
                            rowWithArguments += rowSplit                            
                            argSequencial += 1
                            break
                        else:
                            argSequencial += 1
                
                row = rowWithArguments if rowWithArguments != "" else row
                sql += row
    except Exception:
        sql = ''
    
    return sql

def returnCompetenceStartEnd(competenceInicial, competenceFinal):
    objData = {}
    try:
        competenceInicialSplit = competenceInicial.split('/')
        objData['monthInicial'] = int(competenceInicialSplit[0])
        objData['yearInicial'] = int(competenceInicialSplit[1])
    except Exception:
        objData['monthInicial'] = 5
        objData['yearInicial'] = 2020

    try:
        competenceFinalSplit = competenceFinal.split('/')
        objData['monthFinal'] = int(competenceFinalSplit[0])
        objData['yearFinal'] = int(competenceFinalSplit[1])
    except Exception:
        objData['monthFinal'] = 5
        objData['yearFinal'] = 2020
    
    return objData

def returnMonthsOfYear(year, filterMonthStart, filterYearStart, filterMonthEnd, filterYearEnd):
    if year == filterYearStart and year == filterMonthEnd:
        months = list(range(filterMonthStart, filterMonthEnd+1)) # o mais 1 é pq o range pega só pega do inicial até o último antes do final, exemplo: range(0,3) = [0,1,2]
    elif year == filterYearStart:
        months = list(range(filterMonthStart, 13))
    elif year == filterYearEnd:
        months = list(range(1, filterMonthEnd+1))
    else:
        months = list(range(1,13))

    return months