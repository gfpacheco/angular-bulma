(function (angular) {

  angular
    .module('bulma.services')
    .provider('buDialog', buDialogProvider);

  function buDialogProvider() {
    var containerSelector = 'body';

    this.containerSelector = function(newSelector) {
      containerSelector = newSelector;
    };

    var defaultOptions = {
      buttons: [
        {
          label: 'Ok',
          class: 'is-primary',
        },
      ],
    };

    this.$get = ['$document', '$q', buDialog];

    ///

    function buDialog($document, $q) {
      var container = $document.find(containerSelector);

      var dialog = {
        show: show,
        confirm: confirm,
      };

      return dialog;

      ///

      function show(options) {
        options = angular.extend({}, defaultOptions, options);

        var buttonsHtml = '';
        options.buttons.forEach(function(button) {
          buttonsHtml +=
            '<div class="control">' +
              '<button type="button" class="button ' + button.class + '">' + button.label + '</button>' +
            '</div>';
        });

        var modal = angular.element(
          '<div class="modal is-active bu-dialog">' +
            '<div class="modal-background"></div>' +
            '<div class="modal-content">' +
              '<div class="box">' +
                '<p class="subtitle">' + options.message + '</p>' +
                '<div class="control is-grouped">' +
                  '<div class="control is-expanded"></div>' +
                  buttonsHtml +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>'
        );

        container.append(modal);

        var deferred = $q.defer();
        var promise = deferred.promise;
        modal.on('click', function(e) {
          if (e.target.tagName.toLowerCase() === 'button') {
            modal.remove();
            deferred.resolve(angular.element(e.target).text());
            modal.off('click');
          }
        });
        return promise;
      }

      function confirm(message, noLabel, yesLabel) {
        return dialog.show({
          message: message,
          buttons: [
            {
              label: noLabel || 'No',
              class: 'is-link',
            },
            {
              label: yesLabel || 'Yes',
              class: 'is-primary',
            },
          ],
        });
      }
    }

  }

})(angular);
