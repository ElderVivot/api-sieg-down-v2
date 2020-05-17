const express = require('express')

const ExtractCompaniesController = require('../controllers/ExtractCompaniesController')
const SkipsController = require('../controllers/SkipsController')
const LogSIEGController = require('../controllers/LogSIEGController')

// routes cria as rotas
const routes = express.Router()

// rotas do extract_companies
routes.get('/extract_companies', ExtractCompaniesController.index)

// rotas do skips
routes.get('/skips', SkipsController.show)
routes.post('/skips', SkipsController.store)
routes.put('/skips', SkipsController.update)

// rotas do log_sieg
routes.post('/log_sieg', LogSIEGController.store)

// exportando as rotas
module.exports = routes