module.exports = function(app) {
  require('./controllers/images_controller')(app);
  require('./directives/image_directive')(app);
  require('./directives/image_transclude_directive')(app);
  require('./directives/image_form_directive')(app);
};
