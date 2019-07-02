const router = require('express').Router();
const Users = require('../data/models/usersModel.js');
const {validateUserData, validateUser, validateUserId} = require('../data/middleware');

router.post('/signup', validateUserData, async (req, res) => {
  const newUser = req.validInput;
  try {
    const user = await Users.insert(newUser);
    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    if (error.errno === 19) {
      res.status(405).json(error);
    } else {
      res.status(500).json({error});
    }
  }
});

router.post('/login', validateUser, async (req, res) => {
  try {
    res.status(200).json({
      message: `Welcome ${req.validUser.email}`,
      user: req.validUser
    });
  } catch (error) {
    res.status(500).json({error});
  }
});

router.route('/users/:id')
  .all(validateUserId)
  .put(validateUserData, async (req, res) => {
    try {
      const updatedUser = await Users.update(req.validUser.id, req.validInput);
      res.status(201).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedUser = await Users.remove(req.validUser.id);
      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = router;
