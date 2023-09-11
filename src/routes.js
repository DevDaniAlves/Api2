const {Router} = require('express')
const salaController =  require('./database/controller/salaController');
const itemController = require('./database/controller/itemController');
const turmaController = require('./database/controller/turmaController');
const patrimonioSalaController = require('./database/controller/patrimonioSalaController');
const salaRecebeTurmaController = require('./database/controller/salaRecebeTurmaController');
const manutencaoControleer = require('./database/controller/manutencaoController')
const {authMiddleware} = require('./database/middlewares/authMiddleware')
const siginUserController = require ('./database/controller/sigin-user-controller')
const signupUserController = require ('./database/controller/signup-user-controller')
const routes = Router();

routes.post('/sala/create', authMiddleware,  salaController.createSala)
routes.get('/sala/getAll', authMiddleware, salaController.getAll)
routes.get('/sala/getbyId/:id', authMiddleware, salaController.getSalaById)
routes.put('/sala/update', authMiddleware, salaController.updateSala)
routes.delete('/sala/delete/:id', authMiddleware, salaController.deleteSala)

routes.post('/item/create', authMiddleware, itemController.createItem)
routes.get('/item/getAll', authMiddleware, itemController.getAll)
routes.get('/item/getbyId/:id', authMiddleware, itemController.getItemById)
routes.put('/item/update', authMiddleware, itemController.updateItem)
routes.delete('/item/delete/:id', authMiddleware, itemController.deleteItem)

routes.post('/turma/create', authMiddleware, turmaController.createTurma)
routes.get('/turma/getAll', authMiddleware, turmaController.getAllTurmas)
routes.get('/turma/getbyId/:id', authMiddleware, turmaController.getTurmaById)
routes.put('/turma/update', authMiddleware, turmaController.updateTurma)
routes.delete('/turma/delete/:id', authMiddleware, turmaController.deleteTurma)

routes.post('/patrimonio_sala/create', authMiddleware, patrimonioSalaController.createPatrimonioSala)
routes.get('/patrimonio_sala/getAll', authMiddleware, patrimonioSalaController.getPatrimonioSalaWithSalaAndItem)
routes.get('/patrimonio_sala/getbyId/:id', authMiddleware, patrimonioSalaController.getPatrimonioSalaById)
routes.put('/patrimonio_sala/update', authMiddleware, patrimonioSalaController.updatePatrimonioSala)
routes.delete('/patrimonio_sala/delete/:id', authMiddleware, patrimonioSalaController.deletePatrimonioSala)

routes.post('/sala_recebe_turma/create', authMiddleware, salaRecebeTurmaController.createSalaRecebeTurma)
routes.get('/sala_recebe_turma/getAll', authMiddleware, salaRecebeTurmaController.getSalaRecebeTurmaWithTurma)
routes.get('/sala_recebe_turma/getbyId/:id', authMiddleware, salaRecebeTurmaController.getSalaRecebeTurmaById)
routes.put('/sala_recebe_turma/update', authMiddleware, salaRecebeTurmaController.updateSalaRecebeTurma)
routes.delete('/sala_recebe_turma/delete/:id', authMiddleware, salaRecebeTurmaController.deleteSalaRecebeTurma)

routes.post('/manutencao/create', authMiddleware, manutencaoControleer.createManutencao)
routes.get('/manutencao/getAll', authMiddleware, manutencaoControleer.getManutencaoWithSalaAndItem)
routes.get('/manutencao/getbyId/:id', authMiddleware,manutencaoControleer.getManutencaoById)
routes.put('/manutencao/update', authMiddleware, manutencaoControleer.updateManutencao)
routes.delete('/manutencao/delete/:id', authMiddleware,manutencaoControleer.deleteManutencao)

routes.post('/user/signup', signupUserController.signup);
routes.post('/user/sigin', siginUserController.sigin);

module.exports = {routes}