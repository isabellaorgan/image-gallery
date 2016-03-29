module.exports = function(app) {
  app.directive('imageFormDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/image_form_template.html',
      transclude: true,
      scope: {
        buttonText: '@',
        headingText: '@',
        formName: '@',
        image: '=',
        save: '&',
        imageUrl: '@'
      },
      controller: function($scope) {
        $scope.image = $scope.image || {mainImg: 'img/stache_cat.gif'};
      }
    };
  });
};
