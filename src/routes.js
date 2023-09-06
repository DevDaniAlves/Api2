const {Router} = require('express')
const salaController =  require('./database/controller/salaController')

const routes = Router();

routes.post('/sala', salaController.createSala)

module.exports = {routes}