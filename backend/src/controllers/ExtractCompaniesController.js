const ExtractCompanies = require('../models/ExtractCompanies')

module.exports = {
    async index(req, res){
        try {
            const extractCompanies = await ExtractCompanies.find()

            console.log(` - ExtractCompaniesController.index`)

            return res.json(extractCompanies)
        } catch (error) {
            console.log(' - ExtractCompaniesController.index' + error)
            return res.status(400).json({error: '- ExtractCompaniesController.index - Não foi possível buscar os dados'})
        }
    },
}