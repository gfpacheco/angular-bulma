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

    function digestAndGetModal() {
      $rootScope.$digest();
      return $document.find('.modal');
    }

    it('Renders one active modal with the bu-dialog class', function() {
      buDialog.show();
      var modal = digestAndGetModal();
      expect(modal.hasClass('is-active'));
      expect(modal.hasClass('bu-dialog'));
    });

    it('Renders the sent title inside the bu-dialog-title paragraph', function() {
      var options = {
        title: 'Title sent',
      };
      buDialog.show(options);
      var modal = digestAndGetModal();
      expect(modal.find('.bu-dialog-title').text()).to.equal(options.title);
    });

    it('Does not render any title if not sent', function() {
      var options = {};
      buDialog.show(options);
      var modal = digestAndGetModal();
      expect(modal.find('.bu-dialog-title').length).to.equal(0);
    });

    it('Renders the sent message inside the bu-dialog-message paragraph', function() {
      var options = {
        message: 'Message sent',
      };
      buDialog.show(options);
      var modal = digestAndGetModal();
      expect(modal.find('.bu-dialog-message').text()).to.equal(options.message);
    });

    it('Does not render any message if not sent', function() {
      var options = {};
      buDialog.show(options);
      var modal = digestAndGetModal();
      expect(modal.find('.bu-dialog-message').length).to.equal(0);
    });

    it('Replaces \\n with <br> to improve message formatting', function() {
      var options = {
        message: 'First line.\nSecond line',
      };
      buDialog.show(options);
      var modal = digestAndGetModal();
      expect(modal.find('.bu-dialog-message br').length).to.equal(1);
    });

    it('Renders the default ok button if none sent', function() {
      var options = {
        message: 'Message sent',
      };
      buDialog.show(options);
      var modal = digestAndGetModal();
      var buttonsEl = modal.find('.button');
      expect(buttonsEl.length).to.equal(1);
      expect(buttonsEl.text()).to.equal('Ok');
      expect(buttonsEl.hasClass('is-primary'));
    });

    it('Renders the button with the label and class sent', function() {
      var options = {
        message: 'Message sent',
        buttons: [
          {
            label: 'Yes',
            class: 'is-info',
          },
        ],
      };
      buDialog.show(options);
      var modal = digestAndGetModal();
      var buttonsEl = modal.find('.button');
      expect(buttonsEl.length).to.equal(1);
      expect(buttonsEl.text()).to.equal(options.buttons[0].label);
      expect(buttonsEl.hasClass(options.buttons[0].class));
    });

    it('Returns a Promise that is resolved with the label of the clicked button', function() {
      var callback = sinon.spy();
      var options = {
        message: 'Message sent',
      };
      buDialog.show(options).then(callback);
      var modal = digestAndGetModal();
      modal.find('.button').eq(0).click();
      $rootScope.$digest();
      expect(callback).to.have.been.calledWith('Ok');
    });

    it('Removes the modal when any button is clicked', function() {
      buDialog.show();
      var modal = digestAndGetModal();
      modal.find('.button').eq(0).click();
      $rootScope.$digest();
      expect($document.find('.modal').length).to.equal(0);
    });

  });

  describe('#confirm', function() {

    it('Calls the show method with some predefined configs', function() {
      sinon.spy(buDialog, 'show');
      buDialog.confirm();
      expect(buDialog.show.args[0][0]).to.deep.equal({
        title: undefined,
        message: undefined,
        buttons: [
          {
            label: 'No',
            class: 'is-link',
          },
          {
            label: 'Yes',
            class: 'is-primary',
          }
        ]
      });
      buDialog.show.restore();
    });

    it('Calls the show method with title config', function() {
      sinon.spy(buDialog, 'show');
      var title = 'Title sent';
      buDialog.confirm(title);
      expect(buDialog.show.args[0][0]).to.deep.equal({
        title: title,
        message: undefined,
        buttons: [
          {
            label: 'No',
            class: 'is-link',
          },
          {
            label: 'Yes',
            class: 'is-primary',
          }
        ]
      });
      buDialog.show.restore();
    });

    it('Calls the show method with message config', function() {
      sinon.spy(buDialog, 'show');
      var title = 'Title sent';
      var message = 'Message sent';
      buDialog.confirm(title, message);
      expect(buDialog.show.args[0][0]).to.deep.equal({
        title: title,
        message: message,
        buttons: [
          {
            label: 'No',
            class: 'is-link',
          },
          {
            label: 'Yes',
            class: 'is-primary',
          }
        ]
      });
      buDialog.show.restore();
    });

    it('Calls the show method with some predefined configs and the given labels', function() {
      sinon.spy(buDialog, 'show');
      var title = 'Title sent';
      var message = 'Message sent';
      buDialog.confirm(title, message, 'Sim', 'Não');
      expect(buDialog.show.args[0][0]).to.deep.equal({
        title: title,
        message: message,
        buttons: [
          {
            label: 'Não',
            class: 'is-link',
          },
          {
            label: 'Sim',
            class: 'is-primary',
          }
        ]
      });
      buDialog.show.restore();
    });

    it('Renders the second button with the is-danger class if isDanger argument is true', function() {
      sinon.spy(buDialog, 'show');
      var title = 'Title sent';
      var message = 'Message sent';
      buDialog.confirm(title, message, 'Sim', 'Não', true);
      expect(buDialog.show.args[0][0]).to.deep.equal({
        title: title,
        message: message,
        buttons: [
          {
            label: 'Não',
            class: 'is-link',
          },
          {
            label: 'Sim',
            class: 'is-danger',
          }
        ]
      });
      buDialog.show.restore();
    });

  });

});
