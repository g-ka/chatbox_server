const bcrypt = require('bcrypt');

const users = require('../model/Users');

const sign_up_handler = async (req, res) =>
{
  const { username, password } = req.body;
  if(!username || !password) return res.sendStatus(400);

  const exist = await users.findOne({ username: username });
  if(exist) return res.sendStatus(409);

  try
  {
    const hash_password = await bcrypt.hash(password, 10);

    await users.create({
      username,
      password: hash_password
    })
    return res.sendStatus(200);
  }
  catch(err)
  {
    return res.sendStatus(500);
  }  
};

module.exports = { sign_up_handler }