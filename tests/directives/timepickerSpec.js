'use strict';

describe('bulma.directives.timepicker', function() {

  beforeEach(module('bulma.directives'));

  var $compile;
  var $rootScope;
  var $document;

  beforeEach(inject(function(_$compile_, _$rootScope_, _$document_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $document = _$document_;
  }));

  function getCompiledElement() {
    var element = $compile(
      '<bu-timepicker></bu-timepicker>'
    )($rootScope);
    $document.find('body').append(element);
    $rootScope.$digest();
    return element;
  }

  it('Has two input fields', function() {
    var element = getCompiledElement();
    var inputs = element.find('input');
    expect(inputs.size()).to.equal(2);
  });

});
