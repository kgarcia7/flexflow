const router = require('express').Router();
const { workoutExercise} = require('../../models');

// The `/api/workoutExercise` endpoint

router.get('/', async (req, res) => {
  // find all workoutExercise
  // be sure to include its associated workoutExercises
  try {
    const workoutExerciseData = await workoutExercise.findAll({
      include: [{model: workoutExercise}]
    });
    res.status(200).json(workoutExerciseData);
  } catch (err) {
    res.status(500).json(err);
  }  
});

router.get('/:id', async (req, res) => {
    // find one workoutExercise by its `id` value
  // be sure to include its associated workoutExercises
  try {
    const workoutExerciseData = await workoutExercise.findByPk(req.params.id, {
      include: [{model: workoutExercise}]
    });

    if(!workoutExerciseData){
      res.status(404).json({message: 'No Catergory found with this id'});
      return;
    }
    
    res.status(200).json(workoutExerciseData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new workoutExercise
  try {
    const workoutExerciseData = await workoutExercise.create(req.body);
    res.status(200).json(workoutExerciseData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a workoutExercise by its `id` value
  workoutExercise.update (
    {
      id: req.body.id,
      workoutExercise_name: req.body.workoutExercise_name
    },
    {
      where: {
        id: req.params.id
      },
    }
  )
  .then((updatedworkoutExercise) => {
    res.json(updatedworkoutExercise);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});


router.delete('/:id', async (req, res) => {
  // delete a workoutExercise by its `id` value
  try {
    const workoutExerciseData = await workoutExercise.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!workoutExerciseData) {
      res.status(404).json({ message: 'No workoutExercise found with this id!' });
      return;
    }

    res.status(200).json(workoutExerciseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;