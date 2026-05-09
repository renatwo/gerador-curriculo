const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Curriculo = sequelize.define('Curriculo', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cidade_estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  linkedin: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  foto_url: {
    type: DataTypes.TEXT, // Base64 ou URL
    allowNull: true,
  },
  objetivo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  template_id: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  }
}, {
  timestamps: true,
});

// Modelos relacionados
const Formacao = sequelize.define('Formacao', {
  curso: DataTypes.STRING,
  instituicao: DataTypes.STRING,
  ano_inicio: DataTypes.STRING,
  ano_termino: DataTypes.STRING,
});

const Experiencia = sequelize.define('Experiencia', {
  empresa: DataTypes.STRING,
  cargo: DataTypes.STRING,
  periodo_inicio: DataTypes.STRING,
  periodo_fim: DataTypes.STRING,
  descricao: DataTypes.TEXT,
});

const Habilidade = sequelize.define('Habilidade', {
  nome: DataTypes.STRING,
});

// Associações
Curriculo.hasMany(Formacao, { as: 'formacoes', onDelete: 'CASCADE' });
Formacao.belongsTo(Curriculo);

Curriculo.hasMany(Experiencia, { as: 'experiencias', onDelete: 'CASCADE' });
Experiencia.belongsTo(Curriculo);

Curriculo.hasMany(Habilidade, { as: 'habilidades', onDelete: 'CASCADE' });
Habilidade.belongsTo(Curriculo);

module.exports = { Curriculo, Formacao, Experiencia, Habilidade };
