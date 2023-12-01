const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class WorkoutSessionTracker extends Model {}

//tracks history of workouts
WorkoutSessionTracker.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    workout_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'userWorkout',
        key: 'id'
      }
    }, 
    start_date: {
        type: DataTypes.DATE
    },
    end_date: {
        type: DataTypes.DATE
    },
},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'WorkoutSessionTracker',
  }
);

module.exports = WorkoutSessionTracker;