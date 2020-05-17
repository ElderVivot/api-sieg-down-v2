const RequestAPISIEG = require('./RequestAPISIEG')
const GetSkips = require('./GetSkips')

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

        const getSkips = new GetSkips({
            codi_emp: this.dataRequest.codi_emp,
            year: this.dataRequest.year,
            month: this.dataRequest.month,
            typeNF: this.dataRequest.typeNF,
            typeCNPJ: this.dataRequest.typeCNPJ,
            event: this.dataRequest.downloadevent
        })
        const skip = await getSkips.getData()
        const numberSkipAndQtdNotes = this.getNumberSkipAndQtdNotes(skip)
        let numberSkip = numberSkipAndQtdNotes.numberSkip
        let qtdNotesSkip = numberSkipAndQtdNotes.qtdNotes

        while(true){
            
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
            
            const requestAPISIEG = new RequestAPISIEG(dataRequest)
            const notes = await requestAPISIEG.process()
            const qtdNotes = notes.length || 0

            if(qtdNotes === 0 || qtdNotesSkip === qtdNotes || qtdNotes < 50){
                break
            }
            numberSkip++
        }
        // const requestAPISIEG = new RequestAPISIEG(this.dataRequest)
        // const notes = await requestAPISIEG.process()        
        // console.log(notes)
        // return notes
    }
}

module.exports = LoopForSkip