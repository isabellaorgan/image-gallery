describe('resource services', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;
});

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

describe('resource object', function() {
  beforeEach(angular.mock.inject(function(_$httpBackend_, _restResource_) {
    $httpBackend = _$httpBackend_;
    $restResource = _restResource_('test');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('get function', function() {
    it('should have a callback on data', function() {
      $httpBackend.expectGET('/api/test').respond(200, 'positive');
      $restResource.get(function(err, data) {
        expect(err).toBe(null);
        expect(data).toBe('positive');
      });
      httpBackend.flush();
    });
  });

  describe('update function', function() {
    it('should have a callback on data', function() {
      $httpBackend.expectPUT('/api/images/1').respond(200);
      $httpBackend.flush();
    });
  });

  describe('delete function', function() {
    it('should have a callback on data', function () {
      $httpBackend.expectDELETE('/api/images/1').respond(200, 'positive');
      $restResource.delete(function(err, data) {
        expect(err).toBe(null);
        expect(data).toBe('positive');
      });
      $httpBackend.flush();
    });
  });
	});
