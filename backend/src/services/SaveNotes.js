const fs = require('fs');
const xmljs = require('xml-js')
const PostLogSIEG = require('./PostLogSIEG')
const createFolderToSaveXML = require('./CreateFolderToSaveXML')
const { returnDataInDictOrArray } = require('../util/functions')

class SaveNotes{
    constructor(notes={}, settings={}, dataLog={}){
        this.notes = notes
        this.settings = settings
        this.dataLog = dataLog // recebe o dataLogo pra não precisar configurar do zero
    }

    getData(data, array){
        if( ( this.settings.typeNF === 'nfe' || this.settings.typeNF === 'nfce' ) && this.settings.downloadevent === false){
            return returnDataInDictOrArray(data, ['nfeProc', 'NFe', 'infNFe', ...array])
        } else if(( this.settings.typeNF === 'nfe' || this.settings.typeNF === 'nfce' ) && this.settings.downloadevent === true){
            const optionOne = returnDataInDictOrArray(data, ['procEventoNFe', 'evento', 'infEvento', ...array]) || returnDataInDictOrArray(data, ['envEvento', 'evento', 'infEvento', ...array]) 
            return optionOne || returnDataInDictOrArray(data, ['retConsSitNFe', 'procEventoNFe', 'evento', 'infEvento', ...array])
        } else if(this.settings.typeNF === 'cte' && this.settings.downloadevent === false){
            return returnDataInDictOrArray(data, ['cteProc', 'CTe', 'infCte', ...array]) || returnDataInDictOrArray(data, ['cteOSProc', 'CTeOS', 'infCte', ...array])
        } else if(this.settings.typeNF === 'cte' && this.settings.downloadevent === true){
            return returnDataInDictOrArray(data, ['procEventoCTe', 'eventoCTe', 'infEvento', ...array])
        }
    }

    async process(){
        let hasError = false
        for( let [index, note] of Object.entries(this.notes)){
            const dateHourProcessLog = new Date().toLocaleString('pt-BR', {timezone: "America/Sao_Paulo"})
            this.dataLog['dateHourProcessLog'] = dateHourProcessLog // atualiza pra hora de salvar a nota

            try {
                const noteDecode = new Buffer.from(note, 'base64').toString('ascii')
                const noteJson = JSON.parse(xmljs.xml2json(noteDecode, {compact: true}))
                let keyNFOriginal = this.getData(noteJson, ['_attributes', 'Id'])
                // console.log(JSON.stringify(noteJson, null, 2))
                let keyNF
                let nameFile = ''
                
                // se não conseguir pegar a chave da nota lança uma exceção
                if(keyNFOriginal === "" || keyNFOriginal === undefined){
                    throw "It could'nt get keyNF"
                }
                
                if(this.settings.downloadevent === true){
                    keyNF = keyNFOriginal.substring(8, 52)

                    const eventNF = keyNFOriginal.substring(2, 8)
                    
                    if(eventNF === "110111" || eventNF === "110112" || eventNF === "310611" || eventNF === "240140" || eventNF === "240150"){
                        nameFile = `${keyNF}_canc`
                    } else if(eventNF === "210220"){
                        nameFile = `${keyNF}_descop`
                    } else if(eventNF === "210240"){
                        nameFile = `${keyNF}_opnaor`
                    } else { // ignora os eventos que não são de cancelamento
                        continue
                    }
                } else {
                    keyNF = keyNFOriginal.substring(3, 47)
                    nameFile = keyNF

                    const tpNF = this.getData(noteJson, ['ide', 'tpNF', '_text'])
                    this.settings['tpNF'] = tpNF
                }
                const wayToSaveXML = createFolderToSaveXML(this.settings)

                console.log(`\t\t\t\t- TypeLog: Skip ${this.settings.skip} - Salvando nota ${parseInt(index)+1}/${this.notes.length} - ${nameFile}`)

                fs.writeFileSync(`${wayToSaveXML}\\${nameFile}.xml`, noteDecode, 'utf8')

                const postLogSIEG = new PostLogSIEG({ ...this.dataLog, typeLog: 'note_saved', NF: keyNF })
                await postLogSIEG.postData()
            } catch (error) {
                const noteDecode = new Buffer.from(note, 'base64').toString('ascii')

                console.log('\t\t\t\t- TypeLog: error_save_note')
                const postLogSIEG = new PostLogSIEG({ ...this.dataLog, typeLog: 'error_save_note', error: error, NF: noteDecode})
                await postLogSIEG.postData()
                hasError = true
            }
        }
        return hasError
    }
}

module.exports = SaveNotes