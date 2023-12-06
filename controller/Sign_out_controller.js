const users = require('../model/Users');

const sign_out_handler = async (req, res) =>
{
  const refresh_token = req.cookies?.jwt;
  if(!refresh_token) return res.sendStatus(400);

  const exist = await users.findOne({ refresh_token: refresh_token });
  if(!exist) return res.sendStatus(400);

  try
  {    
    exist.refresh_token = '';   
    await exist.save();
        
    res.clearCookie('jwt', refresh_token, { httpOnly: true, secure: true , sameSite: 'None' });
    return res.sendStatus(200);
  }
  catch(err)
  {
    return res.sendStatus(500);
  }
}

module.exports = { sign_out_handler }