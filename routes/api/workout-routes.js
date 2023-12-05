const router = require('express').Router();
const { Workout} = require('../../models');

// The `/api/Workout` endpoint

router.get('/', async (req, res) => {
  // find all Workout
  // be sure to include its associated Workouts
  try {
    const workoutData = await Workout.findAll({
      include: [{model: Workout}]
    });
    res.status(200).json(WorkoutData);
  } catch (err) {
    res.status(500).json(err);
  }  
});

router.get('/:id', async (req, res) => {
    // find one Workout by its `id` value
  // be sure to include its associated Workouts
  try {
    const workoutData = await Workout.findByPk(req.params.id, {
      include: [{model: Workout}]
    });

    if(!workoutData){
      res.status(404).json({message: 'No Catergory found with this id'});
      return;
    }
    
    res.status(200).json(workoutData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new Workout
  try {
    const workoutData = await Workout.create(req.body);
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a Workout by its `id` value
  Workout.update (
    {
      id: req.body.id,
      workout_name: req.body.Workout_name
    },
    {
      where: {
        id: req.params.id
      },
    }
  )
  .then((updatedWorkout) => {
    res.json(updatedWorkout);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});


router.delete('/:id', async (req, res) => {
  // delete a Workout by its `id` value
  try {
    const workoutData = await Workout.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!workoutData) {
      res.status(404).json({ message: 'No Workout found with this id!' });
      return;
    }

    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;