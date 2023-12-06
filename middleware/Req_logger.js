const req_log_handler =  (req, res, next) =>
{
  console.log(req.method+' '+req.path)
  next();
};

module.exports = req_log_handler