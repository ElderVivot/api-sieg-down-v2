const ProcessFrequency = require('../models/ProcessFrequency')

module.exports = {    
    async store(req, res) {        
        const processFrequency = await ProcessFrequency.create( { ...req.body } )

        console.log(` - ProcessFrequency.store --> ${ JSON.stringify(req.body) }`)

        return res.json(processFrequency)
    }
}