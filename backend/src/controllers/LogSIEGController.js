const LogSIEG = require('../models/LogSIEG')

module.exports = {    
    async store(req, res) {
        try {
            const logSIEG = await LogSIEG.create( { ...req.body } )

            console.log(` - LogSIEG.store --> ${ JSON.stringify(req.body) }`)

            return res.json(logSIEG)
        } catch (error) {
            console.log('- LogSIEG.store -->' + error)
            return res.status(400).json({error: '- LogSIEG.store --> Não foi possível criar os dados'})
        }      
        
    }
}