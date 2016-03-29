module.exports = function(app) {
  app.directive('imageDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/image_directive_template.html',
      scope: {
        image: '=',
      }
    };
  });
};
