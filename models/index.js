// import models
const User = require('./User');
const UserWorkout = require('./UserWorkout');
const WorkoutSession = require('./WorkoutSession');
const Exercises = require('./Exercises');
const WorkoutSessionTracker = require('./WorkoutSessionTracker');

module.exports = {
  User,
  UserWorkout,
  WorkoutSession,
  Exercises,
  WorkoutSessionTracker
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

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
*/