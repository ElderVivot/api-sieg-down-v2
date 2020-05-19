const mongoose = require('mongoose')

// cria como se fosse a tabela do banco de dados este UserSchema
const ProcessFrequency = new mongoose.Schema({
    dateHourInicialLog: String,
    sequencial: Number,
    dateHourInicialProcessLog: String,
    competenceInicial: String,
    competenceFinal: String,
    dateHourFinalProcessLog: String
})

// cria a 'tabela' de fato
module.exports = mongoose.model('process_frequency', ProcessFrequency, 'ProcessFrequency')