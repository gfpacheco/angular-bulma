'use strict';

describe('bulma.directives.timepicker', function() {

  beforeEach(module('bulma.directives'));

  var $compile;
  var $rootScope;
  var $document;
  var element;
  var inputs;

  beforeEach(inject(function(_$compile_, _$rootScope_, _$document_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $document = _$document_;

    $rootScope.time = newTime(12);
    element = $compile(
      '<bu-timepicker ng-model="time"></bu-timepicker>'
    )($rootScope);
    inputs = element.find('input');
    $document.find('body').append(element);
    $rootScope.$digest();
  }));

  function newTime(hours) {
    var time = new Date();
    time.setHours(hours);
    time.setMinutes(0);
    time.setSeconds(0);
    time.setMilliseconds(0);
    return time;
  }

  it('Has two input fields', function() {
    expect(inputs.size()).to.equal(2);
  });

});
