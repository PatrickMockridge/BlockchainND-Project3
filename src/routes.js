const express = require('express')

const routes = express.Router()

const b = require('./controllers/blockChainController')

routes.get('/chain', b.chain)

routes.get('/info', b.info)

routes.get('/block/:height', b.getBlock)

routes.post('/block', b.block)

module.exports = routes
