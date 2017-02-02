(function (angular) {

  angular
    .module('bulma.services')
    .provider('buAlert', buAlertProvider);

  function buAlertProvider() {
    var containerSelector = 'body';

    this.containerSelector = function(newSelector) {
      containerSelector = newSelector;
    };

    this.$get = ['$document', '$q', buAlert];

    ///

    function buAlert($document, $q) {
      var container = $document.find(containerSelector);

      var alert = {
        show: show,
      };

      return alert;

      ///

      function show(message, buttons) {
        if (!buttons) {
          buttons = [{
            label: 'Ok',
            class: 'is-primary',
          }];
        }

        var buttonsHtml = '';
        buttons.forEach(function(button) {
          buttonsHtml +=
            '<div class="control">' +
              '<button type="button" class="button ' + button.class + '">' + button.label + '</button>' +
            '</div>';
        });

        var modal = angular.element(
          '<div class="modal is-active alert">' +
            '<div class="modal-background"></div>' +
            '<div class="modal-content">' +
              '<p class="subtitle">' + message + '</p>' +
              '<div class="control is-grouped">' +
                '<div class="control is-expanded"></div>' +
                buttonsHtml +
              '</div>' +
            '</div>' +
          '</div>'
        );

        container.append(modal);

        var deferred = $q.defer();
        var promise = deferred.promise;
        modal.on('click', function(e) {
          if (e.target.tagName.toLowerCase() === 'button') {
            deferred.resolve(angular.element(e.target).text());
            modal.off('click');
          }
        });
        return promise;
      }
    }

  }

})(angular);
