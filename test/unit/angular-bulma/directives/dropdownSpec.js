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
    var element = $compile('<bu-dropdown label="Label"></bu-dropdown>')($rootScope);
    $rootScope.$digest();
    var button = element.find('button');
    expect(button).to.be.ok;
    expect(button.text()).to.equal('Label');
  });

  it('Updates the button value if the label property changes', function() {
    $rootScope.label = 'Label';
    var element = $compile('<bu-dropdown label="{{label}}"></bu-dropdown>')($rootScope);
    $rootScope.$digest();
    var button = element.find('button');
    expect(button).to.be.ok;
    expect(button.text()).to.equal('Label');
    $rootScope.label = 'New label';
    $rootScope.$digest();
    expect(button.text()).to.equal('New label');
  });

  it('Wraps the content inside a .bu-dropdown div', function() {
    var element = $compile('<bu-dropdown><p>I\'m inside a dropdown</p></bu-dropdown>')($rootScope);
    $rootScope.$digest();
    var dropdown = element.find('.bu-dropdown');
    expect(dropdown).to.be.ok;
    expect(dropdown.find('p').length).to.equal(1);
  });

});
