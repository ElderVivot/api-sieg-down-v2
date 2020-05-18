const RequestAPISIEG = require('./RequestAPISIEG')
const GetSkips = require('./GetSkips')
const PostSkips = require('./PostSkips')
const PostLogSIEG = require('./PostLogSIEG')
const SaveNotes = require('./SaveNotes')

class LoopForSkip{
    constructor(settings){
        this.settings = settings
    }

    getNumberSkipAndQtdNotes(skip){
        let numberSkip = 0
        let qtdNotes = 0
        try {
            numberSkip = skip.numberSkip || 0
            qtdNotes = skip.qtdNotes || 0
        } catch (error) {
            numberSkip = 0
            qtdNotes = 0
        }
        return {
            numberSkip,
            qtdNotes
        }
    }

    async process(){
        const filterSkip = {
            codi_emp: this.settings.codi_emp,
            year: this.settings.year,
            month: this.settings.month,
            typeNF: this.settings.typeNF,
            typeCNPJ: this.settings.typeCNPJ,
            event: this.settings.downloadevent
        }

        const getSkips = new GetSkips(filterSkip)
        const skip = await getSkips.getData()
        const numberSkipAndQtdNotes = this.getNumberSkipAndQtdNotes(skip)
        let numberSkip = numberSkipAndQtdNotes.numberSkip
        let qtdNotesSkip = numberSkipAndQtdNotes.qtdNotes

        while(true){
            const dateHourProcessLog = new Date().toLocaleString('pt-BR', {timezone: "America/Sao_Paulo"})
            
            const dataRequest = {
                apikey: this.settings.apikey,
                email: this.settings.email,
                xmltype: this.settings.typeNF,
                take: 50,
                dataInicio: this.settings.dataInicio,
                dataFim: this.settings.dataFim,
                downloadevent: this.settings.downloadevent
            }
            dataRequest[this.settings.typeCNPJ] = this.settings.cgce_emp
            dataRequest['skip'] = numberSkip
            this.settings['skip'] = numberSkip

            const dataLog = {
                dateHourInicialLog: this.settings.dateHourInicialLog,
                sequencial: this.settings.sequencial,
                dateHourProcessLog: dateHourProcessLog,
                numberSkip: numberSkip,
                ...filterSkip
            }
            
            let notes
            let qtdNotes
            try {
                const requestAPISIEG = new RequestAPISIEG(dataRequest)
                notes = await requestAPISIEG.process()
                qtdNotes = notes.length || 0
            } catch (error) {
                notes = []
                qtdNotes = 0

                console.log('\t\t\t\t- TypeLog: error_request')
                const postLogSIEG = new PostLogSIEG({ ...dataLog, typeLog: 'error_request', error: error })
                await postLogSIEG.postData()
                break
            }

            if(qtdNotes === 0){
                console.log('\t\t\t\t- TypeLog: not_exists_notes_this_skip')
                const postLogSIEG = new PostLogSIEG({ ...dataLog, typeLog: 'not_exists_notes_this_skip' })
                await postLogSIEG.postData()
                break
            }

            if(qtdNotesSkip === qtdNotes){
                console.log('\t\t\t\t- TypeLog: not_exists_new_notes_this_skip')
                const postLogSIEG = new PostLogSIEG({ ...dataLog, typeLog: 'not_exists_new_notes_this_skip' })
                await postLogSIEG.postData()
                break
            }

            if(qtdNotes > 0 && qtdNotes <= 50){
                const saveNotes = new SaveNotes(notes, this.settings, dataLog)
                const hasError = await saveNotes.process()

                // só salva o skip se não tiver dado erro na hora de salvar as notas, se não sempre vai
                // processar este skip novamente
                if(hasError === false){
                    const postSkips = new PostSkips(filterSkip, { ...filterSkip, numberSkip, qtdNotes })
                    await postSkips.postData()
                }
                
                if(qtdNotes < 50){
                    break
                }
            }

            numberSkip++
        }
    }
}

module.exports = LoopForSkip