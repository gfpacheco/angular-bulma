'use strict';

describe('bulma.services.alert', function() {

  beforeEach(module('bulma.services'));

  var $rootScope;
  var $document;
  var buAlert;

  beforeEach(inject(function(_$rootScope_, _$document_, _buAlert_) {
    $rootScope = _$rootScope_;
    $document = _$document_;
    buAlert = _buAlert_;
  }));

  describe('#show', function() {

    it('Renders one active modal with the alert class', function() {
      buAlert.show();
      $rootScope.$digest();
      expect($document.find('.modal.is-active.alert').length).to.equal(1);
    });

  });

});
