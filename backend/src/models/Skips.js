const mongoose = require('mongoose')

// cria como se fosse a tabela do banco de dados este UserSchema
const Skips = new mongoose.Schema({
    codi_emp: Number,
    year: Number,
    month: Number,
    typeNF: String,
    typeCNPJ: String,
    event: Boolean,
    numberSkip: Number,
    qtdNotes: Number
})

// cria a 'tabela' de fato
module.exports = mongoose.model('skips', Skips, 'Skips')