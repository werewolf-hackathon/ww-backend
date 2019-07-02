const router = require('express').Router();
const {restrictedMiddleware} = require('../data/middleware');

router.get('/', restrictedMiddleware, async (req, res) => {
  try {
    res.status(200).json({
      message: 'Restricted accessed'
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
