const path = require('path');

const Unmatched = (req, res) =>
{

  res.status(404);

  if(req.accepts('html'))
  {
    res.sendFile(path.join(__dirname, '../', 'view/', 'Error_404.html'));
  }
  else if(req.accepts('json'))
  {
    res.json({Error: '404 Not Found'});
  }
  else
  {
    res.type('txt').send('404 Not Found');
  }
};

module.exports = Unmatched