const { Sequelize } = require('sequelize');
const sequelize = require('../sequelize')
const SalaRecebeTurma = require('../models/salarecebeturmamodel')(sequelize);
const Turma = require('../models/turmamodel')(sequelize);
const Sala = require('../models/salamodel')(sequelize)

class SalaRecebeTurmaController {
  // Consulta com Inner Join entre SalaRecebeTurma e Turma
  
    async getTurmasBySalaId(req, res) {
      try {
        const { id_sala } = req.params;
        const salaRecebeTurmaData = await SalaRecebeTurma.findAll(
         { where: { id_sala }}
        );
  
      // Use um loop ou mapeamento para buscar dados associados
      const salaRecebeTurmaWithAssociations = await Promise.all(
        salaRecebeTurmaData.map(async (salaRecebeTurma) => {
          const sala = await Sala.findByPk(salaRecebeTurma.id_sala);
          const turma = await Turma.findByPk(salaRecebeTurma.id_turma);
        
  
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
        return res.status(500).json({ error: 'Ocorreu um erro ao obter informações da relação entre sala e turma.' });
      }
    }
    
    
  
  
  async getSalaRecebeTurmaWithTurma(req, res) {
    try {
      const salaRecebeTurmaData = await SalaRecebeTurma.findAll();

    // Use um loop ou mapeamento para buscar dados associados
    const salaRecebeTurmaWithAssociations = await Promise.all(
      salaRecebeTurmaData.map(async (salaRecebeTurma) => {
        const sala = await Sala.findByPk(salaRecebeTurma.id_sala);
        const turma = await Turma.findByPk(salaRecebeTurma.id_turma);

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

      // Obter a sala correspondente
      const sala = await Sala.findByPk(id_sala);

      if (!sala) {
        return res.status(404).json({ error: 'Sala não encontrada.' });
      }

      // Atualizar os campos de disponibilidade da sala com base no turno
      switch (turno) {
        case 1:
          if (!sala.mat_disp) {
            return res.status(405).json({ error: 'Sala já ocupada no turno da manhã.' });
          }
          sala.mat_disp = false;
          break;
        case 2:
          if (!sala.vesp_disp) {
            return res.status(405).json({ error: 'Sala já ocupada no turno da tarde.' });
          }
          sala.vesp_disp = false;
          break;
        case 3:
          if (!sala.not_disp) {
            return res.status(405).json({ error: 'Sala já ocupada no turno da noite.' });
          }
          sala.not_disp = false;
          break;
        default:
          return res.status(405).json({ error: 'Valor inválido para o campo "turno".' });
      }

      // Criar a relação
      const novaRelacao = await SalaRecebeTurma.create({ id_sala, id_turma, turno });

      // Salvar as alterações na sala
      await sala.save();

      return res.status(201).json(novaRelacao);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao criar a relação entre sala e turma.' });
    }
  }


  // Read (obtenção de informações de uma relação entre sala e turma por ID)
  async getSalaRecebeTurmaById(req, res) {
    try {
      const { id } = req.params;

      // Verificar se a relação existe
      const relacao = await SalaRecebeTurma.findOne({
        where: { id },
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
      const { id } = req.params;
      const { id_sala, id_turma, turno } = req.body;

      // Verificar se a relação existe
      const relacao = await SalaRecebeTurma.findOne({
        where: { id },
      });

      if (!relacao) {
        return res.status(404).json({ error: 'Relação entre sala e turma não encontrada.' });
      }

      // Atualizar os dados da relação
      await relacao.update({ id_sala, id_turma, turno });

      return res.status(200).json({ message: 'Relação atualizada com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao atualizar a relação entre sala e turma.' });
    }
  }

  // Delete (exclusão de uma relação entre sala e turma por ID)
  async deleteSalaRecebeTurma(req, res) {
    try {
      const { id } = req.params;

      // Verificar se a relação existe
      const relacao = await SalaRecebeTurma.findOne({
        where: { id },
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
