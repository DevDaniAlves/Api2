const {Router} = require('express')
const {createSala} =  require('./database/controller/salaController')

const routes = Router();

routes.post('/sala', createSala)

module.exports = {routes}