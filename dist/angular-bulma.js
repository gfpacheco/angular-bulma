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
      scope: {
        label: '@'
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
        left: '0',
        zIndex: '1000'
      };

      dropdown.css(css);

      function toggleOpen() {
        dropdown.css('display', 'block');
      }
    }
  }

})(angular);
