'use strict';

describe('angularBulma.directives.dropdown', function() {

  beforeEach(module('angularBulma.directives.dropdown'));

  var $compile;
  var $rootScope;

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Has a button with the value of the label property', function() {
    var element = $compile('<dropdown label="Label"></dropdown>')($rootScope);
    $rootScope.$digest();
    var button = element.find('button');
    expect(button).to.be.ok;
    expect(button.text()).to.equal('Label');
  });

  it('Wraps the content inside a .dropdown div', function() {
    var element = $compile('<dropdown><p>I\'m inside a dropdown</p></dropdown>')($rootScope);
    $rootScope.$digest();
    var dropdown = element.find('.dropdown');
    expect(dropdown).to.be.ok;
    expect(dropdown.find('p').length).to.equal(1);
  });

});
