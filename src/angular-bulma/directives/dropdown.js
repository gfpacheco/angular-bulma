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
      template: '<div class="control">' +
                  '<button class="button" type="button">{{label}}</button>' +
                  '<div class="bu-dropdown" ng-transclude></div>' +
                '<div>'
    };

    return directive;
  }

})(angular);
