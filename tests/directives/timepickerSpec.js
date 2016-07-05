'use strict';

var MILISECONDS_IN_ONE_MINUTE = 1000 * 60;
var MILISECONDS_IN_ONE_HOUR = MILISECONDS_IN_ONE_MINUTE * 60;

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
    return (hours * MILISECONDS_IN_ONE_HOUR) + (minutes * MILISECONDS_IN_ONE_MINUTE);
  }

  function getModelState(time) {
    time = time || $rootScope.time;
    return [
      Math.floor(time / MILISECONDS_IN_ONE_HOUR),
      Math.floor((time % MILISECONDS_IN_ONE_HOUR) / MILISECONDS_IN_ONE_MINUTE)
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

  it('Adds a leading zero if the input value is lower than 10', function() {
    inputs.eq(0).val('1').triggerHandler('input');
    inputs.eq(1).val('2').triggerHandler('input');
    expect(getModelState()).to.deep.equal([1, 2]);
    expect(getViewState()).to.deep.equal(['01', '02']);
  });

  it('Ignores inputs other than numbers', function() {
    inputs.eq(0).val('a').triggerHandler('input');
    inputs.eq(1).val('-1').triggerHandler('input');
    expect(getModelState()).to.deep.equal([0, 1]);
    expect(getViewState()).to.deep.equal(['00', '01']);
  });

  it('Trim hours greater than 23', function() {
    inputs.eq(0).val('25').triggerHandler('input');
    expect(getModelState()).to.deep.equal([23, 34]);
    expect(getViewState()).to.deep.equal(['23', '34']);
  });

  it('Trim minutes greater than 59', function() {
    inputs.eq(1).val('60').triggerHandler('input');
    expect(getModelState()).to.deep.equal([12, 59]);
    expect(getViewState()).to.deep.equal(['12', '59']);
  });

});
