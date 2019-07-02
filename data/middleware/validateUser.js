const Users = require('../models/usersModel.js');
const bcrypt = require('bcryptjs');
const tokenService = require('./tokenService.js');

module.exports = async (req, res, next) => {
  const {username, password} = req.body;
  try {
    const user = await Users.findBy({username}).first();
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = tokenService(user);
      req.validUser = {
        username: user.username,
        id: user.id,
        token: token
      };
      next();
    } else {
      res.status(401).json({
        message: 'Invalid Credentials'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
