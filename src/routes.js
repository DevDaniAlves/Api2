const {Router} = require('express')
const salaController =  require('./database/controller/salaController');
const itemController = require('./database/controller/itemController');
const turmaController = require('./database/controller/turmaController');
const patrimonioSalaController = require('./database/controller/patrimonioSalaController');
const salaRecebeTurmaController = require('./database/controller/salaRecebeTurmaController');
const manutencaoControleer = require('./database/controller/manutencaoController')
const routes = Router();

routes.post('/sala/create', salaController.createSala)
routes.get('/sala/getAll', salaController.getAll)
routes.get('/sala/getbyId/:id', salaController.getSalaById)
routes.put('/sala/update', salaController.updateSala)
routes.delete('/sala/delete/:id', salaController.deleteSala)

routes.post('/item/create', itemController.createItem)
routes.get('/item/getAll', itemController.getAll)
routes.get('/item/getbyId/:id', itemController.getItemById)
routes.put('/item/update', itemController.updateItem)
routes.delete('/item/delete/:id', itemController.deleteItem)

routes.post('/turma/create', turmaController.createTurma)
routes.get('/turma/getAll', turmaController.getAll)
routes.get('/turma/getbyId/:id', turmaController.getTurmaById)
routes.put('/turma/update', turmaController.updateTurma)
routes.delete('/turma/delete/:id', turmaController.deleteTurma)

routes.post('/patrimonio_sala/create', patrimonioSalaController.createPatrimonioSala)
routes.get('/patrimonio_sala/getAll', patrimonioSalaController.getPatrimonioSalaWithSalaAndItem)
routes.get('/patrimonio_sala/getbyId/:id', patrimonioSalaController.getPatrimonioSalaById)
routes.put('/patrimonio_sala/update', patrimonioSalaController.updatePatrimonioSala)
routes.delete('/patrimonio_sala/delete/:id', patrimonioSalaController.deletePatrimonioSala)

routes.post('/sala_recebe_turma/create', salaRecebeTurmaController.createSalaRecebeTurma)
routes.get('/sala_recebe_turma/getAll', salaRecebeTurmaController.getSalaRecebeTurmaWithTurma)
routes.get('/sala_recebe_turma/getbyId/:id', salaRecebeTurmaController.getSalaRecebeTurmaById)
routes.put('/sala_recebe_turma/update', salaRecebeTurmaController.updateSalaRecebeTurma)
routes.delete('/sala_recebe_turma/delete/:id', salaRecebeTurmaController.deleteSalaRecebeTurma)

routes.post('/manutencao/create', manutencaoControleer.createManutencao)
routes.get('/manutencao/getAll', manutencaoControleer.getManutencaoWithSalaAndItem)
routes.get('/manutencao/getbyId/:id', manutencaoControleer.getManutencaoById)
routes.put('/manutencao/update', manutencaoControleer.updateManutencao)
routes.delete('/manutencao/delete/:id', manutencaoControleer.deleteManutencao)


module.exports = {routes}