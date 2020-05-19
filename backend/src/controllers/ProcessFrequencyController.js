const ProcessFrequency = require('../models/ProcessFrequency')

module.exports = {    
    async store(req, res) {
        try {
            const processFrequency = await ProcessFrequency.create( { ...req.body } )

            console.log(` - ProcessFrequency.store --> ${ JSON.stringify(req.body) }`)

            return res.json(processFrequency)
        } catch (error) {
            console.log('- ProcessFrequency.store -->' + error)
            return res.status(400).json({error: '- ProcessFrequency.store --> Não foi possível criar os dados'})
        }       
        
    }
}