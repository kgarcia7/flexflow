const sequelize = require('./config/connection');
const WorkoutExercises = require('./models/WorkoutExercises');
const Exercises = require('./models/Exercises');
const Workout = require('./models/Workout');
const User = require('./models/User');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await User.create({
    name: 'Joyce',
    email: 'joyce@gmail.com',
    password: 'jumping999'
  });

  await Exercises.create({
    exercise_name: 'bench press',
    description: 'bench',
    equipment: 'bench',
    demo: 'https://youtube.com'
  });
 await Workout.create({
    user_id: 1,
    workout_name: 'bro split',
    description: 'push day'
  });
 await WorkoutExercises.create({
  workout_id: 1, 
  exercise_id: 1,
  exercise_data: {
    weight: 25,
    reps: 12,
  },
 })

  process.exit(0);
};
async function viewData () {
  const exerciseTest = await WorkoutExercises.findAll();
console.log(exerciseTest);
}
seedAll();
//viewData();