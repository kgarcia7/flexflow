const router = require('express').Router();
const { ExerciseLog} = require('../../models');

// The `/api/ExerciseLog` endpoint

router.get('/', async (req, res) => {
  // find all ExerciseLog
  // be sure to include its associated ExerciseLogs
  try {
    const ExerciseLogData = await ExerciseLog.findAll({
      include: [{model: ExerciseLog}]
    });
    res.status(200).json(ExerciseLogData);
  } catch (err) {
    res.status(500).json(err);
  }  
});

router.get('/:id', async (req, res) => {
    // find one ExerciseLog by its `id` value
  // be sure to include its associated ExerciseLogs
  try {
    const ExerciseLogData = await ExerciseLog.findByPk(req.params.id, {
      include: [{model: ExerciseLog}]
    });

    if(!ExerciseLogData){
      res.status(404).json({message: 'No Catergory found with this id'});
      return;
    }
    
    res.status(200).json(ExerciseLogData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new ExerciseLog
  try {
    const ExerciseLogData = await ExerciseLog.create(req.body);
    res.status(200).json(ExerciseLogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a ExerciseLog by its `id` value
  ExerciseLog.update (
    {
      id: req.body.id,
      ExerciseLog_name: req.body.ExerciseLog_name
    },
    {
      where: {
        id: req.params.id
      },
    }
  )
  .then((updatedExerciseLog) => {
    res.json(updatedExerciseLog);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});


router.delete('/:id', async (req, res) => {
  // delete a ExerciseLog by its `id` value
  try {
    const ExerciseLogData = await ExerciseLog.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!ExerciseLogData) {
      res.status(404).json({ message: 'No ExerciseLog found with this id!' });
      return;
    }

    res.status(200).json(ExerciseLogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;