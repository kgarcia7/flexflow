const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class ExerciseLog extends Model {}

///sets are represented by rows 
ExerciseLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    workout_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Workout',
        key: 'id'
      }
    }, 
    date: {
      type: DataTypes.DATE
  },
  
},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ExerciseLog',
  }
);

module.exports = ExerciseLog;