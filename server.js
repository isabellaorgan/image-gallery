var mongoose = require('mongoose');
var express = require('express');
var app = express();
var imagesRouter = require(__dirname + '/routes/images_routes');

mongoose.connect(proess.env.MONGOLAB_URI || 'mongodb://localhost/image_gallery_dev');

app.use(express.static(__dirname + '/build'));

app.use('/api', imagesRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server up');
});
