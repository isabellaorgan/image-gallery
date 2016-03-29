var buffer = require(__dirname = '/buffer');

module.exports = exports = function(req, res, next) {
  var userPassEncoded = (req.headers.authorization || ' :').split(' ')[1];
  var userPassBuf = new Buffer(userPassEncoded, 'base64');
  var utf8String = userPassBuf.toString('utf8');
  var splitNameAndPass = utf8String.split(':');
  req.auth = {
    username: splitNameAndPass[0],
    password: splitNameAndPass[1]
  };

  if (!(req.auth.username.length && req.auth.password.length)) {
    console.log('Could not authenticate - username and/or password blank ' + req.auth.username);
    return res.status(401).send({msg: 'Could not authenticate - username and/or password blank'});
  }
  next();
};
