const { Sequelize } = require('sequelize');
const sequelize = require('../sequelize')
const Manutencao = require('../models/manutençãomodel')(sequelize);
const Sala = require('../models/salamodel')(sequelize);
const Item = require('../models/itemmodel')(sequelize);
const PatrimonioSala = require('../models/patrimoniosalamodel')(sequelize)
class ManutencaoController {
  // Consulta com Inner Join entre Manutencao, Sala e Item

  async getManutencoesBySalaId(req, res) {
    try {
      const { idSala } = req.params;
      
      // Encontre todas as manutenções para a sala especificada
      const manutencaoData = await Manutencao.findAll({
        where: { id_sala: idSala },
      });
  
      // Use um loop ou mapeamento para buscar dados associados
      const manutencoesWithAssociations = await Promise.all(
        manutencaoData.map(async (manutencao) => {
          const sala = await Sala.findByPk(manutencao.id_sala);
          const item = await Item.findByPk(manutencao.id_item);
  
          // Combine os dados associados com o objeto Manutencao
          return {
            Manutencao: manutencao,
            sala: sala,
            item: item,
          };
        })
      );
  
      return res.status(200).json(manutencoesWithAssociations);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao obter as manutenções da sala.' });
    }
  }
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
      const { id_item, id_sala, resolvido, quantidade } = req.body;
  
      // Validar os dados antes de criar a manutenção
      if (!id_sala || !id_item || typeof resolvido !== 'boolean' || !quantidade) {
        return res.status(400).json({ error: 'Campos obrigatórios não fornecidos ou inválidos.' });
      }
  
      // Verificar se a manutenção com os mesmos IDs já existe
      // ...
  
      // Verificar se a quantidade de itens da manutenção não excede a quantidade total na tabela PatrimonioSala
      const patrimonioSala = await PatrimonioSala.findOne({
        where: { id_sala, id_item },
      });
  
      if (patrimonioSala && quantidade > patrimonioSala.quantidade) {
        return res.status(401).json({ error: 'A quantidade de itens de manutenção excede a quantidade disponível na sala.' });
      }
  
      // Criar a manutenção
      const novaManutencao = await Manutencao.create({ id_item, id_sala, resolvido, quantidade });
  
      // Subtrair a quantidade de itens de manutenção da quantidade presente na tabela PatrimonioSala
      if (patrimonioSala) {
        const novaQuantidade = patrimonioSala.quantidade - quantidade;
        await patrimonioSala.update({ quantidade: novaQuantidade });
      }
  
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
// ...



// ...

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
  
      // Verificar se o campo "resolvido" foi alterado
      if (resolvido !== manutencao.resolvido) {
        // Obter informações sobre a manutenção
        const { id_sala, id_item, quantidade: quantidadeManutencao } = manutencao;
  
        // Atualizar o campo "resolvido"
        await manutencao.update({ resolvido });
  
        // Atualizar a quantidade na tabela PatrimonioSala
        const patrimonioSala = await PatrimonioSala.findOne({
          where: { id_sala, id_item },
        });
  
        if (patrimonioSala) {
          const novaQuantidade = resolvido ? patrimonioSala.quantidade + quantidadeManutencao : patrimonioSala.quantidade - quantidadeManutencao;
          await patrimonioSala.update({ quantidade: novaQuantidade });
        }
      } else {
        // Caso "resolvido" não tenha sido alterado, apenas atualize os dados da manutenção
        await manutencao.update({ quantidade });
      }
  
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
  
      // Armazena informações da manutenção antes da exclusão
      const { resolvido, id_sala, id_item, quantidade: quantidadeManutencao } = manutencao;
  
      // Excluir a manutenção
      await manutencao.destroy();
  
      // Verificar se o campo "resolvido" é false e atualizar a quantidade na tabela PatrimonioSala
      if (!resolvido) {
        const patrimonioSala = await PatrimonioSala.findOne({
          where: { id_sala, id_item },
        });
  
        if (patrimonioSala) {
          const novaQuantidade = patrimonioSala.quantidade + quantidadeManutencao;
          await patrimonioSala.update({ quantidade: novaQuantidade });
        }
      }
  
      return res.status(200).json({ message: 'Manutenção excluída com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao excluir a manutenção.' });
    }
  }
  
}

module.exports = new ManutencaoController();
