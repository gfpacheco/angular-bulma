'use strict';

describe('angularBulma.directives', function() {

  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function(module) {
    return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function() {
    // Get module
    module = angular.module('angularBulma.directives');
    dependencies = module.requires;
  });

  it('should load dropdown module', function() {
    expect(hasModule('angularBulma.directives.dropdown')).to.be.ok;
  });

});
