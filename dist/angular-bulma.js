(function (angular) {

  angular
    .module('bulma', [
      'bulma.directives'
    ]);

})(angular);

(function (angular) {

  angular
    .module('bulma.directives', []);

})(angular);

(function (angular) {

  angular
    .module('bulma.directives')
    .directive('buDropdown', buDropdown);

  function buDropdown() {
    var directive = {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        label: '@',
        align: '@'
      },
      link: link,
      template: '<div class="control">' +
                  '<button class="button" type="button">{{label}}</button>' +
                  '<div class="bu-dropdown" ng-transclude></div>' +
                '<div>'
    };

    return directive;

    ///

    function link(scope, element) {
      element.on('click', toggleOpen);

      var dropdown = angular.element(element[0].querySelector('.bu-dropdown'));
      var css = {
        display: 'none',
        position: 'absolute',
        top: '100%',
        zIndex: '1000'
      };

      if (scope.align === 'right') {
        css.right = 0;
      } else {
        css.left = 0;
      }

      dropdown.css(css);

      function toggleOpen() {
        dropdown.css('display', dropdown.css('display') === 'block' ? 'none' : 'block');
      }
    }
  }

})(angular);
