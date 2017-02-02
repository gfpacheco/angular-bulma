(function (angular) {

  angular
    .module('bulma.services')
    .provider('buAlert', buAlertProvider);

  function buAlertProvider() {
    var containerSelector = 'body';

    this.containerSelector = function(newSelector) {
      containerSelector = newSelector;
    };

    this.$get = ['$document', buAlert];

    ///

    function buAlert($document) {
      var container = $document.find(containerSelector);

      var alert = {
        show: show,
      };

      return alert;

      ///

      function show() {
        var modal = angular.element(
          '<div class="modal is-active alert">' +
            '<div class="modal-background"></div>' +
            '<div class="modal-content"></div>' +
          '</div>'
        );

        container.append(modal);
      }
    }

  }

})(angular);
