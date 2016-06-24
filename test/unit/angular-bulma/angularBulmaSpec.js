'use strict';

describe('angularBulma', function() {

  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function(module) {
    return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function() {
    // Get module
    module = angular.module('angularBulma');
    dependencies = module.requires;
  });

  it('should load config module', function() {
    expect(hasModule('angularBulma.config')).to.be.ok;
  });

  it('should load directives module', function() {
    expect(hasModule('angularBulma.directives')).to.be.ok;
  });

});
