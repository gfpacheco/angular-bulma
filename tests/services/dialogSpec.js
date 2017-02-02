'use strict';

describe('bulma.services.dialog', function() {

  beforeEach(module('bulma.services'));

  var $rootScope;
  var $document;
  var buDialog;

  beforeEach(inject(function(_$rootScope_, _$document_, _buDialog_) {
    $rootScope = _$rootScope_;
    $document = _$document_;
    buDialog = _buDialog_;
    $document.find('body').empty();
  }));

  describe('#show', function() {

    function callAndReturnModal(method, args) {
      buDialog[method].apply(buDialog, args);
      $rootScope.$digest();
      return $document.find('.modal');
    }

    it('Renders one active modal with the bu-dialog class', function() {
      var modal = callAndReturnModal('show');
      expect(modal.hasClass('is-active'));
      expect(modal.hasClass('bu-dialog'));
    });

    it('Renders the sent message inside a subtitle paragraph', function() {
      var message = 'Message sent';
      var modal = callAndReturnModal('show', [message]);
      expect(modal.find('.subtitle').text()).to.equal(message);
    });

    it('Renders the default ok button if none sent', function() {
      var message = 'Message sent';
      var modal = callAndReturnModal('show', [message]);
      var buttonsEl = modal.find('.button');
      expect(buttonsEl.length).to.equal(1);
      expect(buttonsEl.text()).to.equal('Ok');
      expect(buttonsEl.hasClass('is-primary'));
    });

    it('Renders the button with the label and class sent', function() {
      var message = 'Message sent';
      var buttons = [{
        label: 'Yes',
        class: 'is-info',
      }];
      var modal = callAndReturnModal('show', [message, buttons]);
      var buttonsEl = modal.find('.button');
      expect(buttonsEl.length).to.equal(1);
      expect(buttonsEl.text()).to.equal(buttons[0].label);
      expect(buttonsEl.hasClass(buttons[0].class));
    });

    it('Returns a Promise that is resolved with the label of the clicked button', function() {
      var callback = sinon.spy();
      buDialog.show('Message sent').then(callback);
      $rootScope.$digest();
      $document.find('.modal .button').eq(0).click();
      $rootScope.$digest();
      expect(callback).to.have.been.calledWith('Ok');
    });

    it('Removes the modal when any button is clicked', function() {
      buDialog.show('Message sent');
      $rootScope.$digest();
      $document.find('.modal .button').eq(0).click();
      $rootScope.$digest();
      expect($document.find('.modal').length).to.equal(0);
    });

  });

});
