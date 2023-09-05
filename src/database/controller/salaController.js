const { Op, where } = require('sequelize');
const sequelize = require('../sequelize');
const Sala = require('../models/salamodel')(sequelize); // Importe o modelo da Sala aqui

// Função para criar uma nova sala
exports.createSala = async (req, res) => {
    console.log('Recebendo dados:', req.body)
    const {
      capacidade,
      localizacao,
      responsavel,
      vesp_disp,
      mat_disp,
      not_disp,
      tamanho,
    } = req.body;
  
    // Valide os campos obrigatórios
    if (!capacidade || !localizacao || !responsavel) {
      return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }
  
    // Valide os tipos de dados dos campos
    if (typeof capacidade !== 'number' || typeof vesp_disp !== 'boolean' || typeof mat_disp !== 'boolean' || typeof not_disp !== 'boolean' || typeof tamanho !== 'number') {
      return res.status(400).json({ error: 'Formato de dados inválido para um ou mais campos.' });
    }
  
    try {
      const novaSala = await Sala.create({
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

      return console.log(error)
    }
  };

// Função para listar todas as salas
exports.getAllSalas = async (req, res) => {
  try {
    const salas = await Sala.findAll();
    return res.status(200).json(salas);
  } catch (error) {
    return res.status(500).json({ error: 'Não foi possível buscar as salas.' });
  }
};

// Função para buscar uma sala por ID
exports.getSalaById = async (req, res) => {
  const { id } = req.params;
  try {
    const sala = await Sala.findByPk(id);
    if (!sala) {
      return res.status(404).json({ error: 'Sala não encontrada.' });
    }
    return res.status(200).json(sala);
  } catch (error) {
    return res.status(500).json({ error: 'Não foi possível buscar a sala.' });
  }
};

// Função para atualizar uma sala por ID
exports.updateSala = async (req, res) => {
  const { id } = req.params;
  try {
    const sala = await Sala.findByPk(id);
    if (!sala) {
      return res.status(404).json({ error: 'Sala não encontrada.' });
    }
    await sala.update(req.body);
    return res.status(200).json(sala);
  } catch (error) {
    return res.status(500).json({ error: 'Não foi possível atualizar a sala.' });
  }
};

// Função para excluir uma sala por ID
exports.deleteSala = async (req, res) => {
  const { id } = req.params;
  try {
    const sala = await Sala.findByPk(id);
    if (!sala) {
      return res.status(404).json({ error: 'Sala não encontrada.' });
    }
    await sala.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Não foi possível excluir a sala.' });
  }
};
