(function (angular) {

  angular
    .module('bulma.directives')
    .directive('buTimepicker', buTimepicker);

  buTimepicker.$inject = ['$document'];

  function buTimepicker($document) {
    var directive = {
      restrict: 'E',
      require: '?ngModel',
      template: '<input ng-model="hours"><input ng-model="minutes">',
      link: link
    };

    return directive;

    ///

    function link(scope, element, attrs, ngModel) {
      if (!ngModel) {
        return;
      }

      var timepicker = angular.element(element[0]);
      var inputs = element.find('input');
      var hoursInput = inputs.eq(0);

      ngModel.$formatters.push(modelToView);
      ngModel.$render = render;

      ///

      function modelToView(modelValue) {
        return {
          hours: modelValue.getHours(),
          minutes: modelValue.getMinutes()
        };
      }

      function render() {
        scope.hours = ngModel.$viewValue.hours;
        scope.minutes = ngModel.$viewValue.minutes;
      }
    }
  }

})(angular);
