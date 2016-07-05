(function (angular) {

  angular
    .module('bulma.directives')
    .directive('buTimepicker', buTimepicker);

  buTimepicker.$inject = ['$document'];

  function buTimepicker($document) {
    var directive = {
      restrict: 'E',
      require: '?ngModel',
      scope: {},
      template: '<div class="bu-timepicker control is-grouped">' +
                  '<input class="input" ng-model="hours" ng-change="onInputChange()">' +
                  '<span>:</span>' +
                  '<input class="input" ng-model="minutes" ng-change="onInputChange()">' +
                '</div>',
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
      ngModel.$parsers.push(viewToModel);
      ngModel.$render = render;

      scope.onInputChange = onInputChange;

      ///

      function modelToView(modelValue) {
        return {
          hours: modelValue.getHours(),
          minutes: modelValue.getMinutes()
        };
      }

      function viewToModel(viewValue) {
        var time = new Date();
        time.setHours(viewValue.hours);
        time.setMinutes(viewValue.minutes);
        time.setSeconds(0);
        time.setMilliseconds(0);
        return time;
      }

      function render() {
        scope.hours = ngModel.$viewValue.hours;
        scope.minutes = ngModel.$viewValue.minutes;
      }

      function onInputChange() {
        ngModel.$setViewValue({
          hours: scope.hours,
          minutes: scope.minutes
        });
      }
    }
  }

})(angular);