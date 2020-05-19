const mongoose = require('mongoose')

// cria como se fosse a tabela do banco de dados este UserSchema
const LogSIEG = new mongoose.Schema({
    dateHourInicialLog: String,
    sequencial: Number,
    dateHourProcessLog: String,
    typeLog: String,
    codi_emp: Number,
    cgce_emp: String,
    year: Number,
    month: Number,
    typeNF: String,
    typeCNPJ: String,
    event: Boolean,
    numberSkip: Number,
    NF: String,
    error: String
})

// cria a 'tabela' de fato
module.exports = mongoose.model('log_sieg', LogSIEG, 'LogSIEG')