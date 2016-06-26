(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('angularBulma.config', [])
    .value('angularBulma.config', {
      debug: true
    });

  // Directives
  angular.module('angularBulma.directives', [
    'angularBulma.directives.dropdown'
  ]);

  // Module
  angular.module('angularBulma', [
    'angularBulma.config',
    'angularBulma.directives'
  ]);

})(angular);

(function (angular) {

  angular.module('angularBulma.directives.dropdown', [])
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

      var dropdown = element.find('.bu-dropdown');
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
