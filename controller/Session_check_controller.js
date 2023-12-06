const jwt = require('jsonwebtoken');

const users = require('../model/Users');

const session_check_handler = async (req, res) =>
{
  const refresh_token = req.cookies?.jwt;
  if(!refresh_token) return res.sendStatus(201);

  const exist = await users.findOne({ refresh_token: refresh_token });
  if(!exist) return res.sendStatus(400);

  jwt.verify(
    refresh_token,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) =>
    {
      if(err || exist.username != decoded.username)
      {
        return res.sendStatus(403);
      }

      return res.status(202).json({ "username": decoded.username });
    }
  );
};

module.exports = { session_check_handler }