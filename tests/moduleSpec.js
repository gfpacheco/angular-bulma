'use strict';

describe('bulma', function() {

  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function(module) {
    return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function() {
    // Get module
    module = angular.module('bulma');
    dependencies = module.requires;
  });

  it('should load directives module', function() {
    expect(hasModule('bulma.directives')).to.be.ok;
  });

});
