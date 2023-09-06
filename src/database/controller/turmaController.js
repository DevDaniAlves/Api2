const { Sequelize } = require('sequelize');
const Turma = require('../models/turma')(sequelize);
const Sala = require('../models/salamodel')(sequelize);

class TurmaController {
  // Create (criação de uma turma)
  async createTurma(req, res) {
    try {
      const { professor, turno, nome_turma, id_sala } = req.body;

      // Validar os dados antes de criar a turma
      if (!professor || !turno || !nome_turma || !id_sala) {
        return res.status(400).json({ error: 'Campos obrigatórios não fornecidos.' });
      }

      // Verificar se a sala existe
      const sala = await Sala.findByPk(id_sala);

      if (!sala) {
        return res.status(400).json({ error: 'Sala não encontrada.' });
      }

      // Criar a turma
      const novaTurma = await Turma.create({ professor, turno, nome_turma, id_sala });

      return res.status(201).json(novaTurma);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao criar a turma.' });
    }
  }

  async getAll(req, res) {
    try {
      

      // Verificar se a turma existe
      const turma = await Turma.findAll();

      if (!turma) {
        return res.status(404).json({ error: 'Nenhuma Turma Cadastrada' });
      }

      return res.status(200).json(turma);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao obter informações da turma.' });
    }
  }

  // Read (obtenção de informações de uma turma por ID)
  async getTurmaById(req, res) {
    try {
      const { id } = req.params;

      // Verificar se a turma existe
      const turma = await Turma.findByPk(id);

      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada.' });
      }

      return res.status(200).json(turma);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao obter informações da turma.' });
    }
  }

  // Update (atualização de informações de uma turma por ID)
  async updateTurma(req, res) {
    try {
      const { id } = req.params;
      const { professor, turno, nome_turma, id_sala } = req.body;

      // Verificar se a turma existe
      const turma = await Turma.findByPk(id);

      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada.' });
      }

      // Verificar se a sala existe
      const sala = await Sala.findByPk(id_sala);

      if (!sala) {
        return res.status(400).json({ error: 'Sala não encontrada.' });
      }

      // Atualizar os dados da turma
      await turma.update({ professor, turno, nome_turma, id_sala });

      return res.status(200).json({ message: 'Turma atualizada com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao atualizar a turma.' });
    }
  }

  // Delete (exclusão de uma turma por ID)
  async deleteTurma(req, res) {
    try {
      const { id } = req.params;

      // Verificar se a turma existe
      const turma = await Turma.findByPk(id);

      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada.' });
      }

      // Excluir a turma
      await turma.destroy();

      return res.status(200).json({ message: 'Turma excluída com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao excluir a turma.' });
    }
  }
}

module.exports = new TurmaController();
