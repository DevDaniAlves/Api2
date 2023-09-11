const { Sequelize } = require('sequelize');
const sequelize = require('../sequelize')
const PatrimonioSala = require('../models/patrimoniosalamodel')(sequelize);
const Sala = require('../models/salamodel')(sequelize);
const Item = require('../models/itemmodel')(sequelize);

class PatrimonioSalaController {
  // Consulta com Inner Join entre PatrimonioSala, Sala e Item
  async getPatrimonioSalaWithSalaAndItem(req, res) {
    try {
      const patrimonioSala = await sequelize.query('SELECT (s.id, ps.id, i.nome_item) FROM patrimonio_sala ps INNER JOIN item i on (i.id = ps.id_item) INNER JOIN sala s on (s.id = ps.id_sala)')
      

      return res.status(200).json(patrimonioSala);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao obter informações do patrimônio de sala.' });
    }
  }

  // Create (criação de um patrimônio de sala)
  async createPatrimonioSala(req, res) {
    try {
      const { id_item, id_sala, quantidade } = req.body;

      // Validar os dados antes de criar o patrimônio de sala
      if (!id_item || !id_sala || !quantidade) {
        return res.status(400).json({ error: 'Campos obrigatórios não fornecidos.' });
      }

      // Verificar se o patrimônio de sala com os mesmos IDs já existe
      const patrimonioSalaExistente = await PatrimonioSala.findOne({
        where: { id_item, id_sala },
      });

      if (patrimonioSalaExistente) {
        return res.status(400).json({ error: 'Esse patrimônio de sala já existe.' });
      }

      // Criar o patrimônio de sala
      const novoPatrimonioSala = await PatrimonioSala.create({ id_item, id_sala, quantidade });

      return res.status(201).json(novoPatrimonioSala);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao criar o patrimônio de sala.' });
    }
  }

  // Read (obtenção de informações de um patrimônio de sala por ID)
  async getPatrimonioSalaById(req, res) {
    try {
      const { id_item, id_sala } = req.params;

      // Verificar se o patrimônio de sala existe
      const patrimonioSala = await PatrimonioSala.findOne({
        where: { id_item, id_sala },
      });

      if (!patrimonioSala) {
        return res.status(404).json({ error: 'Patrimônio de sala não encontrado.' });
      }

      return res.status(200).json(patrimonioSala);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao obter informações do patrimônio de sala.' });
    }
  }

  // Update (atualização de informações de um patrimônio de sala por ID)
  async updatePatrimonioSala(req, res) {
    try {
      const { id_item, id_sala } = req.params;
      const { quantidade } = req.body;

      // Verificar se o patrimônio de sala existe
      const patrimonioSala = await PatrimonioSala.findOne({
        where: { id_item, id_sala },
      });

      if (!patrimonioSala) {
        return res.status(404).json({ error: 'Patrimônio de sala não encontrado.' });
      }

      // Atualizar os dados do patrimônio de sala
      await patrimonioSala.update({ quantidade });

      return res.status(200).json({ message: 'Patrimônio de sala atualizado com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao atualizar o patrimônio de sala.' });
    }
  }

  // Delete (exclusão de um patrimônio de sala por ID)
  async deletePatrimonioSala(req, res) {
    try {
      const { id_item, id_sala } = req.params;

      // Verificar se o patrimônio de sala existe
      const patrimônioSala = await PatrimonioSala.findOne({
        where: { id_item, id_sala },
      });

      if (!patrimônioSala) {
        return res.status(404).json({ error: 'Patrimônio de sala não encontrado.' });
      }

      // Excluir o patrimônio de sala
      await patrimônioSala.destroy();

      return res.status(200).json({ message: 'Patrimônio de sala excluído com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao excluir o patrimônio de sala.' });
    }
  }
}

module.exports = new PatrimonioSalaController();
