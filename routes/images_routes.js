var express = require('express');
var bodyParser = require('body-parser');
var Image = require(__dirname + '/../models/image');
var handleError = require(__dirname + '/../lib/handleServerError');

var imagesRouter = module.exports = exports = express.Router();

imagesRouter.get('/images', function(req, res) {
  Image.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

imagesRouter.post('/images', bodyParser.json(), function(req, res) {
  var newImage = new Image(req.body);
  newImage.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

imagesRouter.put('/images/:id', bodyParser.json(), function(req, res) {
  var imageData = req.body;
  delete imageData._id;
  Image.update({_id: req.params.id}, imageData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});

imagesRouter.delete('/images/:id', function(req, res) {
  Image.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});
