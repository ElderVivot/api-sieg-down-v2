const mongoose = require('mongoose')

// cria como se fosse a tabela do banco de dados este UserSchema
const LogSIEG = new mongoose.Schema({
    dateHourInicialLog: String,
    sequencial: Number,
    dateHourProcessLog: String,
    codi_emp: Number,
    year: Number,
    month: Number,
    typeNF: String,
    typeCNPJ: String,
    event: Boolean,
    keyNF: String  
})

// cria a 'tabela' de fato
module.exports = mongoose.model('log_sieg', LogSIEG, 'LogSIEG')