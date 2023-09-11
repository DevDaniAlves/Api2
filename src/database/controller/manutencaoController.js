const { Sequelize } = require('sequelize');
const sequelize = require('../sequelize')
const Manutencao = require('../models/manutençãomodel')(sequelize);
const Sala = require('../models/salamodel')(sequelize);
const Item = require('../models/itemmodel')(sequelize);

class ManutencaoController {
  // Consulta com Inner Join entre Manutencao, Sala e Item
  async getManutencaoWithSalaAndItem(req, res) {
    try {
      const salaRecebeTurmaData = await SalaRecebeTurma.findAll();

    // Use um loop ou mapeamento para buscar dados associados
    const salaRecebeTurmaWithAssociations = await Promise.all(
      salaRecebeTurmaData.map(async (salaRecebeTurma) => {
        const sala = await salaRecebeTurma.getSala();
        const turma = await salaRecebeTurma.getTurma();

        // Combine os dados associados com o objeto SalaRecebeTurma
        return {
          salaRecebeTurma: salaRecebeTurma,
          sala: sala,
          turma: turma,
        };
      })
    );

    return res.status(200).json(salaRecebeTurmaWithAssociations);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao obter informações da manutenção.' });
    }
  }

  // Create (criação de uma manutenção)
  async createManutencao(req, res) {
    try {
      const { id_sala, id_item, resolvido, quantidade } = req.body;

      // Validar os dados antes de criar a manutenção
      if (!id_sala || !id_item || typeof resolvido !== 'boolean' || !quantidade) {
        return res.status(400).json({ error: 'Campos obrigatórios não fornecidos ou inválidos.' });
      }

      // Verificar se a manutenção com os mesmos IDs já existe
      const manutencaoExistente = await Manutencao.findOne({
        where: { id_sala, id_item },
      });

      if (manutencaoExistente) {
        return res.status(400).json({ error: 'Essa manutenção já existe.' });
      }

      // Criar a manutenção
      const novaManutencao = await Manutencao.create({ id_sala, id_item, resolvido, quantidade });

      return res.status(201).json(novaManutencao);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao criar a manutenção.' });
    }
  }

  // Read (obtenção de informações de uma manutenção por ID)
  async getManutencaoById(req, res) {
    try {
      const { id_sala, id_item } = req.params;

      // Verificar se a manutenção existe
      const manutencao = await Manutencao.findOne({
        where: { id_sala, id_item },
      });

      if (!manutencao) {
        return res.status(404).json({ error: 'Manutenção não encontrada.' });
      }

      return res.status(200).json(manutencao);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao obter informações da manutenção.' });
    }
  }

  // Update (atualização de informações de uma manutenção por ID)
  async updateManutencao(req, res) {
    try {
      const { id_sala, id_item } = req.params;
      const { resolvido, quantidade } = req.body;

      // Verificar se a manutenção existe
      const manutencao = await Manutencao.findOne({
        where: { id_sala, id_item },
      });

      if (!manutencao) {
        return res.status(404).json({ error: 'Manutenção não encontrada.' });
      }

      // Atualizar os dados da manutenção
      await manutencao.update({ resolvido, quantidade });

      return res.status(200).json({ message: 'Manutenção atualizada com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao atualizar a manutenção.' });
    }
  }

  // Delete (exclusão de uma manutenção por ID)
  async deleteManutencao(req, res) {
    try {
      const { id_sala, id_item } = req.params;

      // Verificar se a manutenção existe
      const manutencao = await Manutencao.findOne({
        where: { id_sala, id_item },
      });

      if (!manutencao) {
        return res.status(404).json({ error: 'Manutenção não encontrada.' });
      }

      // Excluir a manutenção
      await manutencao.destroy();

      return res.status(200).json({ message: 'Manutenção excluída com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao excluir a manutenção.' });
    }
  }
}

module.exports = new ManutencaoController();
