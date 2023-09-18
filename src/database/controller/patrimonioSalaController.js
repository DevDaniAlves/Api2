const { Sequelize } = require('sequelize');
const sequelize = require('../sequelize')
const PatrimonioSala = require('../models/patrimoniosalamodel')(sequelize);
const Sala = require('../models/salamodel')(sequelize);
const Item = require('../models/itemmodel')(sequelize);

class PatrimonioSalaController {
  // Consulta com Inner Join entre PatrimonioSala, Sala e Item

  async getItemsFromSala(req, res) {
    const { id } = req.params; // Obtenha o ID da sala da URL
  
    try {
      // Encontre todos os patrimônios associados às salas
      const patrimonioSalaData = await PatrimonioSala.findAll({
        where: {
          id_sala: id, // Filtre pelo ID da sala específica
        },
      });
  
      // Use um loop ou mapeamento para buscar dados associados
      const patrimonioSalaWithAssociations = await Promise.all(
        patrimonioSalaData.map(async (patrimonioSala) => {
          const item = await Item.findByPk(patrimonioSala.id_item);
          const sala = await Sala.findByPk(patrimonioSala.id_sala);
  
          // Combine os dados associados com o objeto PatrimonioSala
          return {
            patrimonioSala: patrimonioSala,
            item: item,
            sala: sala,
          };
        })
      );
  
      return res.status(200).json(patrimonioSalaWithAssociations);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao obter informações do patrimônio da sala.' });
    }
  }
  async getSumQuantitiesByItemId(req, res) {
    try {
      const patrimonioSalaData = await PatrimonioSala.findAll();

      // Objeto para armazenar o resultado do agrupamento e soma
      const result = {};

      // Loop pelos registros de PatrimonioSala
      for (const patrimonioSala of patrimonioSalaData) {
        const { id_item, quantidade } = patrimonioSala;

        // Verifica se já existe uma entrada para o id_item
        if (!result[id_item]) {
          result[id_item] = {
            id_item: id_item,
            total_quantidade: 0, // Inicializa a quantidade com 0
          };
        }

        // Adiciona a quantidade ao total existente
        result[id_item].total_quantidade += quantidade;
      }

      // Converte o objeto em um array
      const resultArray = Object.values(result);

      // Consulta os nomes dos itens
      for (const entry of resultArray) {
        const item = await Item.findByPk(entry.id_item);
        entry.nome_item = item ? item.nome_item : null;
      }

      return res.status(200).json(resultArray);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao obter informações.' });
    }
  }
  
  async getPatrimonioSalaWithSalaAndItem(req, res) {
    try {
      const patrimonioSalaData = await PatrimonioSala.findAll();

      // Use um loop ou mapeamento para buscar dados associados
      const patrimonioSalaWithAssociations = await Promise.all(
        patrimonioSalaData.map(async (patrimonioSala) => {
          const item = await Item.findByPk(patrimonioSala.id_item);
          const sala = await Sala.findByPk(patrimonioSala.id_sala);
  
          // Combine os dados associados com o objeto PatrimonioSala
          return {
            patrimonioSala: patrimonioSala,
            item: item,
            sala: sala,
          };
        })
      );
      return res.status(200).json(patrimonioSalaWithAssociations);
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
        where: { id_item, id_sala},
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
      const { id} = req.params;

      // Verificar se o patrimônio de sala existe
      const patrimonioSala = await PatrimonioSala.findOne({
        where: { id},
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
      const { id} = req.params;
      const { quantidade } = req.body;

      // Verificar se o patrimônio de sala existe
      const patrimonioSala = await PatrimonioSala.findOne({
        where: { id},
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
      const { id } = req.params;

      // Verificar se o patrimônio de sala existe
      const patrimônioSala = await PatrimonioSala.findOne({
        where: { id },
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
