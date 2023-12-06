const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = require('../model/Users');

const sign_in_handler = async (req, res) =>
{
  const { username, password } = req.body;
  if(!username || !password) return res.sendStatus(400);  

  const exist = await users.findOne({ username: username });
  if(!exist) return res.sendStatus(400);  

  try
  {
    const match = await bcrypt.compare(password, exist.password);
    if(!match) return res.sendStatus(400);

    const refresh_token = jwt.sign(
      {username},
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    exist.refresh_token = refresh_token;
    await exist.save();

    res.cookie('jwt', refresh_token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24*60*60*1000});
    return res.sendStatus(200);
  }
  catch(err)
  {
    return res.sendStatus(500);    
  }
}

module.exports = { sign_in_handler }