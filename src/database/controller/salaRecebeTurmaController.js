const { Sequelize } = require('sequelize');
const sequelize = require('../sequelize')
const SalaRecebeTurma = require('../models/salarecebeturmamodel')(sequelize);
const Turma = require('../models/turmamodel')(sequelize);

class SalaRecebeTurmaController {
  // Consulta com Inner Join entre SalaRecebeTurma e Turma
  async getSalaRecebeTurmaWithTurma(req, res) {
    try {
      const salaRecebeTurma = await sequelize.query('SELECT (s.id, st.id, t.turma, st.turno) FROM sala_recebe_turma st INNER JOIN turma t on (t.id = m.id_item) INNER JOIN sala s on (s.id = m.id_sala)')
      return res.status(200).json(salaRecebeTurma);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao obter informações da relação entre sala e turma.' });
    }
  }

  // Create (criação de uma relação entre sala e turma)
  async createSalaRecebeTurma(req, res) {
    try {
      const { id_sala, id_turma, turno } = req.body;

      // Validar os dados antes de criar a relação
      if (!id_sala || !id_turma || !turno) {
        return res.status(400).json({ error: 'Campos obrigatórios não fornecidos.' });
      }

      // Verificar se a relação com os mesmos IDs já existe
      const relacaoExistente = await SalaRecebeTurma.findOne({
        where: { id_sala, id_turma },
      });

      if (relacaoExistente) {
        return res.status(400).json({ error: 'Essa relação já existe.' });
      }

      // Criar a relação
      const novaRelacao = await SalaRecebeTurma.create({ id_sala, id_turma, turno });

      return res.status(201).json(novaRelacao);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao criar a relação entre sala e turma.' });
    }
  }

  // Read (obtenção de informações de uma relação entre sala e turma por ID)
  async getSalaRecebeTurmaById(req, res) {
    try {
      const { id_sala, id_turma } = req.params;

      // Verificar se a relação existe
      const relacao = await SalaRecebeTurma.findOne({
        where: { id_sala, id_turma },
      });

      if (!relacao) {
        return res.status(404).json({ error: 'Relação entre sala e turma não encontrada.' });
      }

      return res.status(200).json(relacao);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao obter informações da relação entre sala e turma.' });
    }
  }

  // Update (atualização de informações de uma relação entre sala e turma por ID)
  async updateSalaRecebeTurma(req, res) {
    try {
      const { id_sala, id_turma } = req.params;
      const { turno } = req.body;

      // Verificar se a relação existe
      const relacao = await SalaRecebeTurma.findOne({
        where: { id_sala, id_turma },
      });

      if (!relacao) {
        return res.status(404).json({ error: 'Relação entre sala e turma não encontrada.' });
      }

      // Atualizar os dados da relação
      await relacao.update({ turno });

      return res.status(200).json({ message: 'Relação atualizada com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao atualizar a relação entre sala e turma.' });
    }
  }

  // Delete (exclusão de uma relação entre sala e turma por ID)
  async deleteSalaRecebeTurma(req, res) {
    try {
      const { id_sala, id_turma } = req.params;

      // Verificar se a relação existe
      const relacao = await SalaRecebeTurma.findOne({
        where: { id_sala, id_turma },
      });

      if (!relacao) {
        return res.status(404).json({ error: 'Relação entre sala e turma não encontrada.' });
      }

      // Excluir a relação
      await relacao.destroy();

      return res.status(200).json({ message: 'Relação excluída com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao excluir a relação entre sala e turma.' });
    }
  }
}

module.exports = new SalaRecebeTurmaController();
