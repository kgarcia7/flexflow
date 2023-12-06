const router = require('express').Router();
const exerciseLogRoutes = require('./exerciseLog-routes');
const exercisesRoutes = require('./exercises-routes');
const loginRoutes = require('/login-routes');
const userRoutes = require('./user-routes');
const workoutRoutes= require('./workout-routes');
const workoutExercisesRoutes = require('./workoutExercises-routes');
const workoutExerciseTrackerRoutes = require('./workoutExerciseTracker-routes');


router.use('/exerciseLog', exerciseLogRoutes);
router.use('/exercises', exercisesRoutes);
router.use('/login', loginRoutes);
router.use('/user', userRoutes);
router.use('/workout',workoutRoutes);
router.use('/workoutexercise',workoutExercisesRoutes);
router.use('/tracker',workoutExerciseTrackerRoutes);

module.exports = router;
