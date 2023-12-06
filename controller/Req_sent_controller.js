const { format } = require('date-fns');
const jwt = require('jsonwebtoken');

const users = require('../model/Users');

const req_sent_handler = async (req, res) =>
{
  const { auth_username, username } = req.body;
  if(!auth_username || !username) return res.sendStatus(400);

  const exist = await users.findOne({ username: auth_username});
  if(!exist) return res.sendStatus(400);

  const reciever = await users.findOne({ username });
  if(!reciever) return res.sendStatus(400);

  try
  {
    const date = format(new Date(), 'dd/MM/yyyy');
    const time = format(new Date(), 'HH:mm:ss');

    exist.req_sent.push({
      username,
      date,
      time
    });

    reciever.req_recieved.push({
      username: auth_username,
      date,
      time
    });

    await exist.save();
    await reciever.save();
    return res.sendStatus(200);
  }
  catch(err)
  {
    return res.sendStatus(500);
  }  
};

const fetch_req_sent_handler = async (req, res) =>
{
  const refresh_token = req.cookies?.jwt;
  if(!refresh_token) return res.sendStatus(400);

  const exist = await users.findOne({ refresh_token: refresh_token });
  if(!exist) return res.sendStatus(400);

  return res.status(200).json({ req_sent_list: exist.req_sent });
};

module.exports = { req_sent_handler, fetch_req_sent_handler }