require(__dirname + '/../../app/js/entry');
require('angular-mocks');

describe('imagess controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;
  var image;

  beforeEach(angular.mock.module('ImageGalleryApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = $ControllerConstructor('ImagesController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.images)).toBe(true);
  });

  describe('REST request functions', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('ImagesController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add an array to images with a GET all', function() {
      $httpBackend.expectGET('/api/images').respond(200, [{_id: 1, name: 'test image'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.images[0].name).toBe('test image');
    });

    it('should be able to submit a new image', function() {
      $httpBackend.expectPOST('/api/images', {name: 'test image', caption: 'Photo'}).respond(200, {name: 'a different image'});
      expect($scope.images.length).toBe(0);
      expect($scope.newImage).toEqual($scope.defaults);
      $scope.newImage.name = 'test image';
      $scope.create($scope.newImage);
      $httpBackend.flush();
      expect($scope.images[0].name).toBe('a different image');
      expect($scope.newImage).toEqual($scope.defaults);
    });

    it('should be able to update an image', function() {
      var image = {_id: 1, editing: true};
      $httpBackend.expectPUT('/api/images/1').respond(200);
      $scope.update(image);
      $httpBackend.flush();
      expect(image.editing).toBe(false);
    });

    it('should be able to remove an image', function () {
      var image = {_id: 1, name: 'test image'};
      $scope.images = [image];
      $httpBackend.expectDELETE('/api/images/1').respond(200);
      $scope.remove(image);
      $httpBackend.flush();
      expect($scope.images.length).toBe(0);
    });
  });
});
