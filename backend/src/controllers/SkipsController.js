const Skips = require('../models/Skips')

module.exports = {
    async show(req, res){
        try {
            const skips = await Skips.findOne( { ...req.query } )

            console.log(` - Skips.show --> ${JSON.stringify(req.query)}`)

            return res.json(skips)
        } catch (error) {
            console.log('- Skips.show -->' + error)
            return res.status(400).json({error: '- Skips.show --> Não foi possível buscar os dados'})
        }
    },

    async store(req, res) {
        try {
            const skips = await Skips.create( { ...req.body } )

            console.log(` - Skips.store --> ${JSON.stringify(req.body)}`)

            return res.json(skips)
        } catch (error) {
            console.log('- Skips.store -->' + error)
            return res.status(400).json({error: '- Skips.store --> Não foi possível cadastrar os dados'})  
        }
    },

    async update(req, res) {
        try {
            const skips = await Skips.findOneAndUpdate( { ...req.query }, {
                ...req.body
            })

            console.log(` - Skips.update --> ${JSON.stringify(req.query)}`)
    
            return res.json(skips)
        } catch (error) {
            console.log('- Skips.update -->' + error)
            return res.status(400).json({error: '- Skips.update --> Não foi possível atualizar os dados'})        
        }        
    },
}