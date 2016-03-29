var angular = window.angular;
module.exports = function(app) {
  app.controller('ImagesController', ['$scope', '$http', 'resource', function($scope, $http, resource) {
    $scope.images = [];
    $scope.errors = [];
    $scope.defaults = {caption: 'photo'};
    $scope.newImage = angular.copy($scope.defaults);
    $scope.messageOne = 'Hello from inside the controller!';
    var imagesResource = resource('images');

    $scope.getAll = function() {
      imagesResource.getAll(function(err, data) {
        if (err) return err;

        $scope.images = data;
      });
    };

    $scope.create = function(image) {
      imagesResource.create(image, function(err, data){
        if (err) return err;
        $scope.images.push(data);
        $scope.newImage = angular.copy($scope.defaults);
      });
    };

    $scope.update = function(image) {
      image.editing = false;
      $http.put('/api/images/' + image._id, image)
        .then(function(res) {
          console.log('Image has a new caption');
        }, function(err) {
          $scope.errors.push('could not get image: ' + image.url + ' to submit');
          console.log(err.data);
        });
    };

    $scope.edit = function(image) {
      image.editing = !image.editing;
      image.currentName = image.url;
    };

    $scope.cancel = function(image) {
      image.url = image.currentURL;
    };

    $scope.remove = function(image) {
      $scope.images.splice($scope.images.indexOf(image), 1);
      $http.delete('/api/images/' + image._id)
        .then(function(res) {
          console.log('Image has been removed');
        }, function(err) {
          console.log(err.data);
          $scope.errors.push('Unable to remove Image: ' + image.url);
          $scope.getAll();
        });
    };
  }]);
};
