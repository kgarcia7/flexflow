const router = require('express').Router();
const { Exercises, Workout } = require('../../models');

// The `/api/exercises` endpoint

router.get('/', async (req, res) => {
  // find all exercises
  // be sure to include its associated Workouts
  try {
    const exercisesData = await Exercises.findAll({
      include: [{model: Workout}]
    });
    res.status(200).json(exercisesData);
  } catch (err) {
    res.status(500).json(err);
  }  
});

router.get('/:id', async (req, res) => {
    // find one exercises by its `id` value
  // be sure to include its associated Workouts
  try {
    const exerciseData = await Exercises.findByPk(req.params.id, {
      include: [{model: Workout}]
    });

    if(!exerciseData){
      res.status(404).json({message: 'No Exercise found with this id'});
      return;
    }
    
    res.status(200).json(exerciseData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new Exercises
  try {
    const exercisesData = await Exercises.create(req.body);
    res.status(200).json(exercisesData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a exercises by its `id` value
  Exercises.update (
    {
      id: req.body.id,
      Exercises_name: req.body.Exercises_name
    },
    {
      where: {
        id: req.params.id
      },
    }
  )
  .then((updatedExercises) => {
    res.json(updatedExercises);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});


router.delete('/:id', async (req, res) => {
  // delete a Exercises by its `id` value
  try {
    const exercisesData = await Exercises.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!exercisesData) {
      res.status(404).json({ message: 'No Exercises found with this id!' });
      return;
    }

    res.status(200).json(exercisesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;