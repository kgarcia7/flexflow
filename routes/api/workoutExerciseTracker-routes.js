const router = require('express').Router();
const { workoutExerciseTracker} = require('../../models');

// The `/api/workoutExerciseTracker` endpoint

router.get('/', async (req, res) => {
  // find all workoutExerciseTracker
  // be sure to include its associated workoutExerciseTrackers
  try {
    const workoutExerciseTrackerData = await workoutExerciseTracker.findAll({
      include: [{model: workoutExerciseTracker}]
    });
    res.status(200).json(workoutExerciseTrackerData);
  } catch (err) {
    res.status(500).json(err);
  }  
});

router.get('/:id', async (req, res) => {
    // find one workoutExerciseTracker by its `id` value
  // be sure to include its associated workoutExerciseTrackers
  try {
    const workoutExerciseTrackerData = await workoutExerciseTracker.findByPk(req.params.id, {
      include: [{model: workoutExerciseTracker}]
    });

    if(!workoutExerciseTrackerData){
      res.status(404).json({message: 'No Catergory found with this id'});
      return;
    }
    
    res.status(200).json(workoutExerciseTrackerData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new workoutExerciseTracker
  try {
    const workoutExerciseTrackerData = await workoutExerciseTracker.create(req.body);
    res.status(200).json(workoutExerciseTrackerData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a workoutExerciseTracker by its `id` value
  workoutExerciseTracker.update (
    {
      id: req.body.id,
      workoutExerciseTracker_name: req.body.workoutExerciseTracker_name
    },
    {
      where: {
        id: req.params.id
      },
    }
  )
  .then((updatedworkoutExerciseTracker) => {
    res.json(updatedworkoutExerciseTracker);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});


router.delete('/:id', async (req, res) => {
  // delete a workoutExerciseTracker by its `id` value
  try {
    const workoutExerciseTrackerData = await workoutExerciseTracker.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!workoutExerciseTrackerData) {
      res.status(404).json({ message: 'No workoutExerciseTracker found with this id!' });
      return;
    }

    res.status(200).json(workoutExerciseTrackerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;