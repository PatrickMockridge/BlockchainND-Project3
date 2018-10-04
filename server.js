const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const routes = require('./src/routes')

const PORT = 8000

const server = express()

server.use(compression())

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json({verify:function(req,res,buf){req.rawBody=buf}}))
server.use(require('method-override')())

server.use('/', routes)

server.listen(PORT, () => console.log(`server is running on port ${PORT}`))
