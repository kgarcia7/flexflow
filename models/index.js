// import models
const User = require('./User');
const Workout = require('./Workout');
const Exercises = require('./Exercises');
const ExerciseLog = require('./ExerciseLog');
const WorkoutSessionTracker = require('./WorkoutSessionTracker');
const WorkoutExercises = require('./WorkoutExercises');

//Workout belongsToOne User
Workout.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
//User hasMany Workout
User.hasMany(Workout, {
  foreignKey: 'workout_name',
  onDelete: 'CASCADE',
});
//WorkoutExercises BelongsTo Exercise library
WorkoutExercises.belongsTo(Exercises, {
  through: {
    model: Workout,
    unique: 'false'
  },
  as: 'exercise_options'
});
//workoutExercises belongsToMany workout
WorkoutExercises.belongsToMany(Workout, {
  through: {
    model: Exercises,
    unique: false
  },
  as: 'exercise_list'
});
//Userworkout hasMany Exercises
Workout.hasMany(WorkoutExercises, {
  foreignKey: 'exercise_id',
  onDelete: 'CASCADE'
});
//WorkoutSessionTracker hasOne UserWorkout
WorkoutSessionTracker.hasMany(Workout, {
  foreignKey: 'workout_id',
  onDelete: 'CASCADE'
});

//UserWorkout belongsToMany WorkoutSessionTracker
//ExerciseLog belongsToOne WorkoutSessionTracker
ExerciseLog.hasOne(Workout, {
  foreignKey: 'workout_id',
  onDelete: 'CASCADE'
});
//ExerciseLog belongsToOne UserWorkout
ExerciseLog.belongsTo(WorkoutSessionTracker, {
  through: {
    model: Workout,
    unique: false
  },
  as: 'exercise_session_log'
});
//ExerciseLog hasMany Exercises
//Exercises belongsToMany ExerciseLog

module.exports = {
  User,
  Workout,
  Exercises,
  WorkoutSessionTracker,
  ExerciseLog
};