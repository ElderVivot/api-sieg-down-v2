const Skips = require('../models/Skips')

module.exports = {
    async show(req, res){
        const skips = await Skips.findOne( { ...req.query } )

        console.log(` - Skips.index`)

        return res.json(skips)
    },

    async store(req, res) {        
        const skips = await Skips.create( { ...req.body } )

        console.log(` - Skips.store --> ${req.body.codi_emp}`)

        return res.json(skips)
    },

    async update(req, res) {
        try {
            const skips = await Skips.findOneAndUpdate( { ...req.query }, {
                ...req.body
            })

            console.log(` - Skips.update --> ${req.body.codi_emp}`)
    
            return res.json(skips)
        } catch (error) {
            console.log(error)
            return res.status(400).json({error: 'Não foi possível atualizar os dados'})        
        }        
    },
}