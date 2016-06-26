'use strict';

describe('bulma.directives.dropdown', function() {

  beforeEach(module('bulma.directives'));

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
    expect(button.text()).to.equal('Label');
  });

  it('Updates the button value if the label property changes', function() {
    $rootScope.label = 'Label';
    var element = $compile('<bu-dropdown label="{{label}}"></bu-dropdown>')($rootScope);
    $rootScope.$digest();
    var button = element.find('button');
    expect(button.text()).to.equal('Label');
    $rootScope.label = 'New label';
    $rootScope.$digest();
    expect(button.text()).to.equal('New label');
  });

  it('Wraps the content inside a .bu-dropdown div', function() {
    var element = $compile('<bu-dropdown><p>I\'m inside a dropdown</p></bu-dropdown>')($rootScope);
    $rootScope.$digest();
    var dropdown = element.find('.bu-dropdown');
    expect(dropdown.find('p').length).to.equal(1);
  });

  it('Hides the .bu-dropdown div by default', function() {
    var element = $compile('<bu-dropdown></bu-dropdown>')($rootScope);
    $rootScope.$digest();
    var dropdown = element.find('.bu-dropdown');
    expect(dropdown.css('display')).to.equal('none');
  });

  it('Shows the .bu-dropdown div when clicked', function() {
    var element = $compile('<bu-dropdown></bu-dropdown>')($rootScope);
    $rootScope.$digest();
    var dropdown = element.find('.bu-dropdown');
    element.trigger('click');
    expect(dropdown.css('display')).to.equal('block');
  });

  it('Hides the .bu-dropdown div if clicked twice', function() {
    var element = $compile('<bu-dropdown></bu-dropdown>')($rootScope);
    $rootScope.$digest();
    var dropdown = element.find('.bu-dropdown');
    element.trigger('click');
    element.trigger('click');
    expect(dropdown.css('display')).to.equal('none');
  });

  it('Shows the .bu-dropdown div if clicked tree times', function() {
    var element = $compile('<bu-dropdown></bu-dropdown>')($rootScope);
    $rootScope.$digest();
    var dropdown = element.find('.bu-dropdown');
    element.trigger('click');
    element.trigger('click');
    element.trigger('click');
    expect(dropdown.css('display')).to.equal('block');
  });

  it('Aligns the .bu-dropdown div to the left by default', function() {
    var element = $compile('<bu-dropdown></bu-dropdown>')($rootScope);
    $rootScope.$digest();
    var dropdown = element.find('.bu-dropdown');
    expect(dropdown.css('left')).to.equal('0px');
  });

  it('Aligns the .bu-dropdown div to the right if told so', function() {
    var element = $compile('<bu-dropdown align="right"></bu-dropdown>')($rootScope);
    $rootScope.$digest();
    var dropdown = element.find('.bu-dropdown');
    expect(dropdown.css('right')).to.equal('0px');
  });

});
