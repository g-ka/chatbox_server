const users = require('../model/Users');

const connections_handler = async (req, res) =>
{
  const refresh_token = req.cookies?.jwt;
  if(!refresh_token) return res.sendStatus(400);

  const exist = await users.findOne({ refresh_token: refresh_token });
  if(!exist) return res.sendStatus(400);

  return res.status(200).json({ connections_list: exist.connections });
};

module.exports = { connections_handler }