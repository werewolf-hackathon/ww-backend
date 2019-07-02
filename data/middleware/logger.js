const timestamp = require('time-stamp');

module.exports = (req, res, next) => {
  console.log(
    `A ${req.method} request to ${req.url} at ${timestamp.utc('HH:mm:ss on MM/DD/YYYY')}`
  );
  next();
};
