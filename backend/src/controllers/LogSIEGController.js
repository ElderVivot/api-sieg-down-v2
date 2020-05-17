const LogSIEG = require('../models/LogSIEG')

module.exports = {    
    async store(req, res) {        
        const logSIEG = await LogSIEG.create( { ...req.body } )

        console.log(` - LogSIEG.store --> ${ JSON.stringify(req.body) }`)

        return res.json(logSIEG)
    }
}