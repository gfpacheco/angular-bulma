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
    $document.find('body').empty();
  }));

  describe('#show', function() {

    function callAndReturnModal(method, args) {
      buAlert[method].call(buAlert, args);
      $rootScope.$digest();
      return $document.find('.modal');
    }

    it('Renders one active modal with the alert class', function() {
      var modal = callAndReturnModal('show');
      expect(modal.hasClass('is-active'));
      expect(modal.hasClass('alert'));
    });

    it('Renders the sent message inside a subtitle paragraph', function() {
      var message = 'Message sent';
      var modal = callAndReturnModal('show', [message]);
      expect(modal.find('.subtitle').text()).to.equal(message);
    });

  });

});
