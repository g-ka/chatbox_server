const allowed_origins = require('./Allowed_origins');

const CORS_options = {
  origin: (origin, callback) =>
  {
    if(allowed_origins.indexOf(origin) != -1 || !origin)
    {
      callback(null, true);
    }
    else
    {
      callback(new Error('CORS - Forbidden'));
    }
  },
  optionsSuccessStatus: 200
};

module.exports = CORS_options;