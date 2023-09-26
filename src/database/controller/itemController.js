const { Sequelize } = require('sequelize');
const sequelize = require('../sequelize')
const Item = require('../models/itemmodel')(sequelize);

class ItemController {
  // Create (criação de um item)
  async createItem(req, res) {
    try {
      const { nome_item } = req.body;

      // Validar os dados antes de criar o item
      if (!nome_item) {
        return res.status(400).json({ error: 'Campos obrigatórios não fornecidos.' });
      }

      // Verificar se o item com o mesmo nome já existe
      const itemExistente = await Item.findOne({ where: { nome_item } });

      if (itemExistente) {
        return res.status(400).json({ error: 'Um item com este nome já existe.' });
      }

      // Criar o item
      const novoItem = await Item.create({ nome_item });

      return res.status(201).json(novoItem);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao criar o item.' });
    }
  }

  async getAll(req, res) {
    try {

      // Verificar se o item existe
      const item = await Item.findAll();

      if (!item) {
        return res.status(404).json({ error: 'Nenhum item cadastrado.' });
      }

      return res.status(200).json(item);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao obter informações do item.' });
    }
  }
  // Read (obtenção de informações de um item por ID)
  async getItemById(req, res) {
    try {
      const { id } = req.params;

      // Verificar se o item existe
      const item = await Item.findByPk(id);

      if (!item) {
        return res.status(404).json({ error: 'Item não encontrado.' });
      }

      return res.status(200).json(item);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao obter informações do item.' });
    }
  }

  // Update (atualização de informações de um item por ID)
  async updateItem(req, res) {
    try {
      const { id } = req.params;
      const { nome_item } = req.body;

      // Verificar se o item existe
      const item = await Item.findByPk(id);

      if (!item) {
        return res.status(404).json({ error: 'Item não encontrado.' });
      }

      // Atualizar os dados do item
      await item.update({ nome_item });

      return res.status(200).json({ message: 'Item atualizado com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao atualizar o item.' });
    }
  }

  // Delete (exclusão de um item por ID)
  async deleteItem(req, res) {
    try {
      const { id } = req.params;

      // Verificar se o item existe
      const item = await Item.findByPk(id);

      if (!item) {
        return res.status(404).json({ error: 'Item não encontrado.' });
      }

      // Excluir o item
      await item.destroy();

      return res.status(200).json({ message: 'Item excluído com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao excluir o item.' });
    }
  }
}

module.exports = new ItemController();
