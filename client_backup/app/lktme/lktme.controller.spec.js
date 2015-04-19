'use strict';

describe('Controller: LktmeCtrl', function () {

  // load the controller's module
  beforeEach(module('reachingApp'));

  var LktmeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LktmeCtrl = $controller('LktmeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
