const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Workout extends Model {}

Workout.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model:'user',
        key:'id'
      }
    },
    workout_name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Workout',
  }
);

module.exports = Workout;
