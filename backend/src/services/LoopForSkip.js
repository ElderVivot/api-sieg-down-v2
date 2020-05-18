const RequestAPISIEG = require('./RequestAPISIEG')
const GetSkips = require('./GetSkips')
const PostSkips = require('./PostSkips')
const PostLogSIEG = require('./PostLogSIEG')
const SaveNotes = require('./SaveNotes')

class LoopForSkip{
    constructor(dataRequest){
        this.dataRequest = dataRequest
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
            codi_emp: this.dataRequest.codi_emp,
            year: this.dataRequest.year,
            month: this.dataRequest.month,
            typeNF: this.dataRequest.typeNF,
            typeCNPJ: this.dataRequest.typeCNPJ,
            event: this.dataRequest.downloadevent
        }

        const getSkips = new GetSkips(filterSkip)
        const skip = await getSkips.getData()
        const numberSkipAndQtdNotes = this.getNumberSkipAndQtdNotes(skip)
        let numberSkip = numberSkipAndQtdNotes.numberSkip
        let qtdNotesSkip = numberSkipAndQtdNotes.qtdNotes

        while(true){
            const dateHourProcessLog = new Date().toLocaleString('pt-BR', {timezone: "America/Sao_Paulo"})
            
            const dataRequest = {
                apikey: this.dataRequest.apikey,
                email: this.dataRequest.email,
                xmltype: this.dataRequest.typeNF,
                take: 50,
                dataInicio: this.dataRequest.dataInicio,
                dataFim: this.dataRequest.dataFim,
                downloadevent: this.dataRequest.downloadevent
            }
            dataRequest[this.dataRequest.typeCNPJ] = this.dataRequest.cgce_emp
            dataRequest['skip'] = numberSkip
            this.dataRequest['skip'] = numberSkip

            const dataLog = {
                dateHourInicialLog: this.dataRequest.dateHourInicialLog,
                sequencial: this.dataRequest.sequencial,
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
                const postLogSIEG = new PostLogSIEG({ ...dataLog, typeLog: 'error_request' })
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
                const saveNotes = new SaveNotes(notes, this.dataRequest)
                saveNotes.process()

                const postSkips = new PostSkips(filterSkip, { ...filterSkip, numberSkip, qtdNotes })
                await postSkips.postData()
                if(qtdNotes < 50){
                    break
                }
            }

            numberSkip++
        }
    }
}

module.exports = LoopForSkip