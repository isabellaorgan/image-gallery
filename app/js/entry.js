require('angular/angular');
require('angular-route');
var angular = window.angular;

var imageGalleryApp = angular.module('ImageGalleryApp', ['ngRoute']);
require('./filters/filters')(imageGalleryApp);
require('./services/services')(imageGalleryApp);
require('./directives/directives')(imageGalleryApp);
require('./images/images')(imageGalleryApp);

imageGalleryApp.config(['$routeProvider', function($route) {
  $route
    .when('/images', {
      templateUrl: '/templates/images_view.html',
      controller: 'ImagesController'
    })
    .otherwise({
      redirectTo: '/images'
    });
}]);
