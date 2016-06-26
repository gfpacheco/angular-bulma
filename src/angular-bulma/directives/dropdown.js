(function (angular) {

  angular.module('angularBulma.directives.dropdown', [])
    .directive('dropdown', dropdown);

  function dropdown() {
    var directive = {
      restrict: 'E',
      transclude: true,
      scope: {
        label: '@'
      },
      template: '<div class="control">' +
                  '<button class="button" type="button">{{label}}</button>' +
                  '<div class="dropdown" ng-transclude></div>' +
                '<div>'
    };

    return directive;
  }

})(angular);
