const fs = require('fs');
const xmljs = require('xml-js')
const PostLogSIEG = require('./PostLogSIEG')
const { createFolderToSaveXML } = require('./CreateFolderToSaveXML')

class SaveNotes{
    constructor(notes={}, settings={}){
        this.notes = notes
        this.settings = settings
    }

    getData(data, array){
        if( ( this.settings.typeNF === 'nfe' || this.settings.typeNF === 'nfce' ) && this.settings.downloadevent === false){
            return returnDataInDictOrArray(data, ['nfeProc', 'NFe', 'infNFe', ...array])
        } else if(( this.settings.typeNF === 'nfe' || this.settings.typeNF === 'nfce' ) && this.settings.downloadevent === true){
            return returnDataInDictOrArray(data, ['procEventoNFe', 'evento', 'infEvento', ...array])
        } else if(this.settings.typeNF === 'cte' && this.settings.downloadevent === false){
            return returnDataInDictOrArray(data, ['cteProc', 'CTe', 'infCTe', ...array])
        } else if(this.settings.typeNF === 'cte' && this.settings.downloadevent === true){
            return returnDataInDictOrArray(data, ['procEventoCTe', 'evento', 'infEvento', ...array])
        }
    }

    process(){
        for( let [index, note] of Object.entries(this.notes)){
            const noteDecode = new Buffer.from(note, 'base64').toString('ascii')
            const noteJson = JSON.parse(xmljs.xml2json(noteDecode, {compact: true}))
            let keyNF = this.getData(noteJson, ['_attributes', 'Id'])
            let nameFile = ''
            
            if(this.settings.downloadevent === true){
                keyNF = keyNF.substring(8, 52)

                let eventNF = keyNF.substring(2, 8)
                
                if(eventNF === "110111" || eventNF === "110112" || eventNF === "310611" || eventNF === "240140" || eventNF === "240150"){
                    nameFile = `${nameFile}_canc`
                } else if(eventNF === "210220"){
                    nameFile = `${nameFile}_descop`
                } else if(eventNF === "210240"){
                    nameFile = `${nameFile}_opnaor`
                } else { // ignora os eventos que não são de cancelamento
                    continue
                }
            } else {
                keyNF = keyNF.substring(3, 47)
                nameFile = keyNF

                const tpNF = this.getData(noteJson, ['ide', 'tpNF', '_text'])
                this.settings['tpNF'] = tpNF
            }
            const wayToSaveXML = createFolderToSaveXML(this.settings)

            fs.writeFileSync(`${wayToSaveXML}\\${keyNF}.xml`, noteDecode, 'utf8')
        }
    }
}

module.exports = SaveNotes