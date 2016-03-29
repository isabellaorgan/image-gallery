var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
  url: String,
  caption: {type: String, default: 'photo'},
  mainImage: {type: String, default: '/img/hat_cat.gif'},
  subImg1: {type: String, default: '/img/stache_cat.gif'},
  subImg2: String
});

module.exports = mongoose.model('Image', imageSchema);
