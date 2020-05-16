const mongoose = require('mongoose')

// cria como se fosse a tabela do banco de dados este UserSchema
const ExtractCompaniesSchema = new mongoose.Schema({
    codi_emp: Number,
    nome_emp: String,
    cgce_emp: String,
    tins_emp: Number,
    stat_emp: String,
    dcad_emp: String,
    dina_emp: String,
    dtinicio_emp: String
})

// cria a 'tabela' de fato
module.exports = mongoose.model('extract_companies', ExtractCompaniesSchema, 'ExtractCompanies')