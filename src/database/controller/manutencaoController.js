const { Sequelize } = require('sequelize');
const sequelize = require('../sequelize')
const Manutencao = require('../models/manutençãomodel')(sequelize);
const Sala = require('../models/salamodel')(sequelize);
const Item = require('../models/itemmodel')(sequelize);

class ManutencaoController {
  // Consulta com Inner Join entre Manutencao, Sala e Item

  async getManutencoesWithSala(req, res) {
    try {
      const { id } = req.params;
  
      // Find all maintenance records for the specified room
      const manutencaoData = await Manutencao.findAll({
        where: { id_sala: id },
      });
  
      // Use a loop or mapping to fetch associated room data (Sala)
      const manutencoesWithSala = await Promise.all(
        manutencaoData.map(async (manutencao) => {
          const sala = await Sala.findByPk(manutencao.id_sala);
          const item = await Item.findByPk(manutencao.id_item);
  
          // Combine the associated room data with the Manutencao object
          return {
            Manutencao: manutencao,
            sala: sala,
            item: item
          };
        })
      );
  
      return res.status(200).json(manutencoesWithSala);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao obter as manutenções da sala.' });
    }
  }
  async getManutencaoWithSalaAndItem(req, res) {
    try {
      const ManutencaoData = await Manutencao.findAll();

    // Use um loop ou mapeamento para buscar dados associados
    const ManutencaoWithAssociations = await Promise.all(
      ManutencaoData.map(async (Manutencao) => {
        const sala = await Sala.findByPk(Manutencao.id_sala);
        const item = await Item.findByPk(Manutencao.id_item);

        // Combine os dados associados com o objeto Manutencao
        return {
          Manutencao: Manutencao,
          sala: sala,
          turma: item,
        };
      })
    );

    return res.status(200).json(ManutencaoWithAssociations);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao obter informações da manutenção.' });
    }
  }

  // Create (criação de uma manutenção)
  async createManutencao(req, res) {
    try {
      const {  id_item, id_sala, resolvido, quantidade } = req.body;

      // Validar os dados antes de criar a manutenção
      if ( !id_sala || !id_item || typeof resolvido !== 'boolean' || !quantidade) {
        return res.status(400).json({ error: 'Campos obrigatórios não fornecidos ou inválidos.' });
      }

      // Verificar se a manutenção com os mesmos IDs já existe
     

    

      // Criar a manutenção
      const novaManutencao = await Manutencao.create({ id_item, id_sala, resolvido, quantidade });

      return res.status(201).json(novaManutencao);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao criar a manutenção.' });
    }
  }

  // Read (obtenção de informações de uma manutenção por ID)
  async getManutencaoById(req, res) {
    try {
      const { id } = req.params;

      // Verificar se a manutenção existe
      const manutencao = await Manutencao.findOne({
        where: { id },
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
      const { id } = req.params;
      const { resolvido, quantidade } = req.body;

      // Verificar se a manutenção existe
      const manutencao = await Manutencao.findOne({
        where: { id },
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
      const { id } = req.params;

      // Verificar se a manutenção existe
      const manutencao = await Manutencao.findOne({
        where: { id },
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
