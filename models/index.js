// import models
const User = require('./User');
const UserWorkout = require('./Workout');
const Exercises = require('./Exercises');
const ExerciseLog = require('./ExerciseLog');
const WorkoutSessionTracker = require('./WorkoutSessionTracker');

//UserWorkout belongsToOne User
//User hasMany UserWorkout
//Exercises BelongsToMany UserWorkouts
//Userworkout hasMany Exercises
//WorkoutSessionTracker hasOne UserWorkout
//UserWorkout belongsToMany WorkoutSessionTracker
//ExerciseLog belongsToOne WorkoutSessionTracker
//ExerciseLog belongsToOne UserWorkout
//ExerciseLog hasMany Exercises
//Exercises belongsToMany ExerciseLog

module.exports = {
  User,
  UserWorkout,
  Exercises,
  WorkoutSessionTracker,
  ExerciseLog
};
/*
// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },
   as: 'products_by_tags'
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
   as: 'tag_list'
});
*/