const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class UserWorkout extends Model {}

UserWorkout.init(
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
    exercise_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'exercises',
        id: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'userWorkout',
  }
);

module.exports = UserWorkout;
