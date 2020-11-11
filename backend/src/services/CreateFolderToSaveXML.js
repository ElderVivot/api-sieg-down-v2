const fs = require('fs')
const { zeroLeft } = require('../util/functions')

const createFolderToSaveXML = (settings) => {
    let wayToSaveXMLs = settings.wayToSaveXMLs
    fs.existsSync(wayToSaveXMLs) || fs.mkdirSync(wayToSaveXMLs)

    const nameEmp = settings.nome_emp
    const codiEmp = settings.codi_emp
    const year = settings.year
    const month = zeroLeft(settings.month, 2)
    const tpNF = settings.tpNF || '1' // tpNF = 1 --> emissão de quem vendeu (entrada) ; tpNF = 0 --> emissão própria (saída)

    let operationNF = ''
    if( ( settings.typeCNPJ === "cnpjDest" && tpNF === '1' ) || ( settings.typeCNPJ === "cnpjEmit" && tpNF === '0' ) || settings.typeCNPJ === "cnpjTom"){
        operationNF = 'Entradas'
    } else {
        operationNF = 'Saidas'
    }

    let typeNF = ''
    if(settings.typeNF === "nfe"){
        typeNF = 'NF-e'
    } else if(settings.typeNF === "cte"){
        typeNF = 'CT-e'
    } else if(settings.typeNF === "nfce"){
        typeNF = 'NFC-e'
    } else if(settings.typeNF === "nfse"){
        typeNF = 'NFS-e'
    }
  
    let namePasteCompanie = `${nameEmp.trim().normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z ])/g, '').toUpperCase().substring(0, 70)} - ${codiEmp}`
    fs.existsSync(`${wayToSaveXMLs}\\${namePasteCompanie}`) || fs.mkdirSync(`${wayToSaveXMLs}\\${namePasteCompanie}`)
    wayToSaveXMLs = `${wayToSaveXMLs}\\${namePasteCompanie}`
  
    let namePasteYear = year
    fs.existsSync(`${wayToSaveXMLs}\\${namePasteYear}`) || fs.mkdirSync(`${wayToSaveXMLs}\\${namePasteYear}`)
    wayToSaveXMLs = `${wayToSaveXMLs}\\${namePasteYear}`

    let namePasteMonth = month
    fs.existsSync(`${wayToSaveXMLs}\\${namePasteMonth}`) || fs.mkdirSync(`${wayToSaveXMLs}\\${namePasteMonth}`)
    wayToSaveXMLs = `${wayToSaveXMLs}\\${namePasteMonth}`
  
    // entradas ou saídas
    let namePasteOperationNF = operationNF
    fs.existsSync(`${wayToSaveXMLs}\\${namePasteOperationNF}`) || fs.mkdirSync(`${wayToSaveXMLs}\\${namePasteOperationNF}`)
    wayToSaveXMLs = `${wayToSaveXMLs}\\${namePasteOperationNF}`
  
    let nameTypeNF = typeNF
    fs.existsSync(`${wayToSaveXMLs}\\${nameTypeNF}`) || fs.mkdirSync(`${wayToSaveXMLs}\\${nameTypeNF}`)
    wayToSaveXMLs = `${wayToSaveXMLs}\\${nameTypeNF}`
  
    return wayToSaveXMLs
  }

  module.exports = createFolderToSaveXML