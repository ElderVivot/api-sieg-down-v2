const express = require('express')

const ExtractCompaniesController = require('../controllers/ExtractCompaniesController')

// routes cria as rotas
const routes = express.Router()

// rotas do extract_companies
routes.get('/extract_companies', ExtractCompaniesController.index)

// exportando as rotas
module.exports = routes