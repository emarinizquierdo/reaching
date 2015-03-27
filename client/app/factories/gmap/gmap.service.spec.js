'use strict';

describe('Service: gmap', function () {

  // load the service's module
  beforeEach(module('reachingApp'));

  // instantiate service
  var gmap;
  beforeEach(inject(function (_gmap_) {
    gmap = _gmap_;
  }));

  it('should do something', function () {
    expect(!!gmap).toBe(true);
  });

});
