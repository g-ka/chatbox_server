const users = require('../model/Users');

const fetch_users_handler = async (req, res) =>
{
  const refresh_token = req.cookies?.jwt;
  if(!refresh_token) return res.sendStatus(400);

  const exist = await users.findOne({ refresh_token: refresh_token });
  if(!exist) return res.sendStatus(400);

  const connections = exist.connections.map(user => user.username);
  const req_sent = exist.req_sent.map(user => user.username);
  const req_recieved = exist.req_recieved.map(user => user.username);

  const users_list = await users.find();
  return res.status(200).json({ users: users_list, connections, req_sent, req_recieved });
};

module.exports = { fetch_users_handler }