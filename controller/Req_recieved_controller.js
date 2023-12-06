const users = require('../model/Users');

const accept_req_handler = async (req, res) =>
{
  const { username } = req.body;
  if(!username) return res.sendStatus(400);

  const refresh_token = req.cookies?.jwt;
  if(!refresh_token) return res.sendStatus(201);

  const exist = await users.findOne({ refresh_token: refresh_token });
  if(!exist) return res.sendStatus(400);

  const sender = await users.findOne({ username });
  if(!sender) return res.sendStatus(400);

  try
  {
    const filtered_recieved_list = exist.req_recieved.filter(user => user.username !== sender.username);

    exist.req_recieved = filtered_recieved_list;
    exist.connections.push({ username: sender.username });

    const filtered_sent_list = sender.req_sent.filter(user => user.username !== exist.username);
    
    sender.req_sent = filtered_sent_list;    
    sender.connections.push({ username: exist.username });

    await exist.save();
    await sender.save();

    return res.sendStatus(200);
  }
  catch(err)
  {
    return res.sendStatus(500);
  }
};

const req_recieved_handler = async (req, res) =>
{
  const refresh_token = req.cookies?.jwt;
  if(!refresh_token) return res.sendStatus(201);

  const exist = await users.findOne({ refresh_token: refresh_token });
  if(!exist) return res.sendStatus(400);

  return res.status(200).json({ req_recieved_list: exist.req_recieved });
};

module.exports = { req_recieved_handler, accept_req_handler }