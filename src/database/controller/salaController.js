const sequelize = require('../sequelize')
const Sala = require('../models/salamodel')(sequelize);

class salaController {
  // Create (criação de uma sala)
   async createSala (req, res) {
    try {
      const {
        id,
        capacidade,
        localizacao,
        responsavel,
        vesp_disp,
        mat_disp,
        not_disp,
        tamanho,
      } = req.body;

      // Validar os dados antes de criar a sala
      if (!id || !capacidade || !localizacao || !responsavel || !tamanho) {
        return res.status(400).json({ error: 'Campos obrigatórios não fornecidos.' });
      }

      // Verificar se a sala com o mesmo ID já existe
      const salaExistente = await Sala.findOne({ where: { id } });
      if (salaExistente) {
        return res.status(400).json({ error: 'Uma sala com este ID já existe.' });
      }

      // Criar a sala
      const novaSala = await Sala.create({
        id,
        capacidade,
        localizacao,
        responsavel,
        vesp_disp,
        mat_disp,
        not_disp,
        tamanho,
      });

      return res.status(201).json(novaSala);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao criar a sala.' });
    }
  }

  // Read (obtenção de informações de uma sala por ID)
   async getSalaById (req, res) {
    try {
      const salaId = req.params.id;

      // Verificar se a sala existe
      const sala = await Sala.findByPk(salaId);

      if (!sala) {
        return res.status(404).json({ error: 'Sala não encontrada.' });
      }

      return res.status(200).json(sala);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao obter informações da sala.' });
    }
  }

  // Update (atualização de informações de uma sala por ID)
   async updateSala (req, res) {
    try {
      const salaId = req.params.id;
      const updatedData = req.body;

      // Verificar se a sala existe
      const sala = await Sala.findByPk(salaId);

      if (!sala) {
        return res.status(404).json({ error: 'Sala não encontrada.' });
      }

      // Atualizar os dados da sala
      await sala.update(updatedData);

      return res.status(200).json({ message: 'Sala atualizada com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao atualizar a sala.' });
    }
  }
  // Delete (exclusão de uma sala por ID)
   async deleteSal (req, res){
    try {
      const salaId = req.params.id;

      // Verificar se a sala existe
      const sala = await Sala.findByPk(salaId);

      if (!sala) {
        return res.status(404).json({ error: 'Sala não encontrada.' });
      }

      // Excluir a sala
      await sala.destroy();

      return res.status(200).json({ message: 'Sala excluída com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao excluir a sala.' });
    }
  }
};

module.exports = new salaController;
