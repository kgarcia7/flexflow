const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class WorkoutExercises extends Model {}

//tracks history of workouts
WorkoutExercises.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    workout_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Workout',
        key: 'id'
      }
    }, 
    exercise_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Exercises',
            key: 'id'
        }
    },
    exercise_data: {
      type: DataTypes.JSON
    },
},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'WorkoutExercises',
  }
);

module.exports = WorkoutExercises;