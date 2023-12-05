const router = require('express').Router();
const { User} = require('../../models');

// The `/api/Users` endpoint

router.get('/', async(req, res) => {
  // find all Users
  // be sure to include its associated Product data
  console.log("FOUND IT")
try {
  const userData = await User.findAll({
  });

  if (!userData) {
    res.status(404).json({ message: 'User not found with this id!' });
    return;
  }

  res.status(200).json(userData);
  } catch (err) {
    console.log("FOUND IT AGAIN", err)
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single User by its `id`
  // be sure to include its associated Product data
  try {
    const userData = await User.findByPk(req.params.id, {
    });

    if (!userData) {
      res.status(404).json({ message: 'User not found with this id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new User
  try {
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a User's name by its `id` value
  try {
  const userData = await User.update(
    {
      user_name: req.body.User_name,
    },
    {
      where: {
        id: req.params.id
      }
    }
  );
  res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on User by its `id` value
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: 'No User found with that id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
