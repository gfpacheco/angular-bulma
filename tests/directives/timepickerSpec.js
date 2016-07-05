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

    $rootScope.time = newTime(12, 34);
    element = $compile(
      '<bu-timepicker ng-model="time"></bu-timepicker>'
    )($rootScope);
    inputs = element.find('input');
    $document.find('body').append(element);
    $rootScope.$digest();
  }));

  function newTime(hours, minutes) {
    var time = new Date();
    time.setHours(hours);
    time.setMinutes(minutes);
    time.setSeconds(0);
    time.setMilliseconds(0);
    return time;
  }

  function getModelState(time) {
    time = time || $rootScope.time;
    return [
      time.getHours(),
      time.getMinutes()
    ];
  }

  function getViewState(ins) {
    ins = ins || inputs;
    return [
      ins.eq(0).val(),
      ins.eq(1).val()
    ];
  }

  it('Has two input fields', function() {
    expect(inputs.size()).to.equal(2);
  });

  it('Shows the hour of the sent date in the first input field', function() {
    expect(getModelState()[0]).to.equal(12);
    expect(getViewState()[0]).to.equal('12');
  });

  it('Shows the minute of the sent date in the second input field', function() {
    expect(getModelState()[1]).to.equal(34);
    expect(getViewState()[1]).to.equal('34');
  });

  it('Changes the scope value when the input changes', function() {
    inputs.eq(0).val('21').triggerHandler('input');
    inputs.eq(1).val('43').triggerHandler('input');
    expect(getModelState()).to.deep.equal([21, 43]);
    expect(getViewState()).to.deep.equal(['21', '43']);
  });

  it('Does not share scope', function() {
      $rootScope.time2 = newTime(12, 34);
      var element2 = $compile(
        '<bu-timepicker ng-model="time2"></bu-timepicker>'
      )($rootScope);
      var inputs2 = element2.find('input');
      $document.find('body').append(element2);
      $rootScope.$digest();
      inputs2.eq(0).val('21').triggerHandler('input');
      inputs2.eq(1).val('43').triggerHandler('input');
      expect(getModelState($rootScope.time2)).to.deep.equal([21, 43]);
      expect(getViewState(inputs2)).to.deep.equal(['21', '43']);
      expect(getModelState()).to.deep.equal([12, 34]);
      expect(getViewState()).to.deep.equal(['12', '34']);
  });

});
