(function (angular) {

  angular
    .module('bulma.directives')
    .directive('buDropdown', buDropdown);

  buDropdown.$inject = ['$window', '$document'];

  function buDropdown($window, $document) {
    var directive = {
      restrict: 'C',
      scope: {
        align: '@'
      },
      link: link
    };

    return directive;

    ///

    function link(scope, element) {
      element.on('click', toggle);

      var body = angular.element(element[0].querySelector('.bu-dropdown-body'));

      function toggle(event) {
        event.stopPropagation();
        if ($window.getComputedStyle(body[0], null).display === 'none') {
          open();
        } else {
          close();
        }
      }

      function open() {
        body.css('display', 'block');
        $document.on('click', close);
      }

      function close() {
        body.css('display', 'none');
        $document.off('click', close);
      }

      scope.$on('$destroy', function() {
        $document.off('click', close);
      });
    }
  }

})(angular);
