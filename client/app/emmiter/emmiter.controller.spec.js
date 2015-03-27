'use strict';

describe('Controller: EmmiterCtrl', function () {

  // load the controller's module
  beforeEach(module('reachingApp'));

  var EmmiterCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmmiterCtrl = $controller('EmmiterCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
