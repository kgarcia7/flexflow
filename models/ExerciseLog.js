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
    workout_session: {
      type: DataTypes.INTEGER,
      references: {
        model: 'WorkoutSessionTracker',
        id: 'id'
      }
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
        model: 'exercises',
        key: 'id'
      }
    },
    weight_used: {
        type: DataTypes.DECIMAL
    },
    weight_units: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['lbs','kg']]
      }
    },
    start_time: {
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
    modelName: 'ExerciseLog',
  }
);

module.exports = ExerciseLog;