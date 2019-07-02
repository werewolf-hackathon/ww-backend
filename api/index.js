const router = require('express').Router();
const {forEachFile} = require('../util');

// Requires all API router files.
forEachFile(__dirname, './', file => {
  const path = `./${file}`;
  router.use(path.slice(1), require(path));
});

module.exports = router;
