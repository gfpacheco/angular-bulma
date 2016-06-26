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
      var dropdown = element.find('.bu-dropdown');
      var css = {
        display: 'none',
        position: 'absolute',
        top: '100%',
        left: '0',
        zIndex: '1000'
      };

      dropdown.css(css);
    }
  }

})(angular);
