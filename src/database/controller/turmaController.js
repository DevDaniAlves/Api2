const sequelize = require('../sequelize')
const Turma = require('../models/turmamodel')(sequelize);

class turmaController {
  // Criar uma nova turma
  async createTurma(req, res) {
    const { professor, turno, nome_turma } = req.body;

    try {
      const newTurma = await Turma.create({ professor, turno, nome_turma });
      return res.status(201).json(newTurma);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Não foi possível criar a turma.' });
    }
  }

  // Listar todas as turmas
  async getAllTurmas(req, res) {
    try {
      const turmas = await Turma.findAll();
      return res.status(200).json(turmas);
    } catch (error) {
      return res.status(500).json({ error: 'Não foi possível buscar as turmas.' });
    }
  }

  // Buscar uma turma por ID
  async getTurmaById(req, res) {
    const { id } = req.params;
    try {
      const turma = await Turma.findByPk(id);
      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada.' });
      }
      return res.status(200).json(turma);
    } catch (error) {
      return res.status(500).json({ error: 'Não foi possível buscar a turma.' });
    }
  }

  // Atualizar uma turma por ID
  async updateTurma(req, res) {
    const { id } = req.params;
    try {
      const turma = await Turma.findByPk(id);
      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada.' });
      }
      await turma.update(req.body);
      return res.status(200).json(turma);
    } catch (error) {
      return res.status(500).json({ error: 'Não foi possível atualizar a turma.' });
    }
  }

  // Excluir uma turma por ID
  async deleteTurma(req, res) {
    const { id } = req.params;
    try {
      const turma = await Turma.findByPk(id);
      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada.' });
      }
      await turma.destroy();
      return res.status(200).json({ message: 'Turma excluída com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: 'Não foi possível excluir a turma.' });
    }
  }
}

module.exports = new turmaController();
