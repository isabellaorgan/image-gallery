module.exports = function(app) {
  app.directive('imageTransclude', function() {
    return {
      restrict: 'AC',
      templateUrl: '/templates/image_transclude_directive',
      replace: true,
      transclude: true,
      scope: {
        messageOne: '@'
      }

    };
  });
};
