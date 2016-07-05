(function (angular) {

  var MILISECONDS_IN_ONE_MINUTE = 1000 * 60;
  var MILISECONDS_IN_ONE_HOUR = MILISECONDS_IN_ONE_MINUTE * 60;

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

      function formatInput(value, max) {
        value = ('' + value).replace(/[^0-9]/, '');
        if (parseInt(value || 0, 10) > max) {
          value = max;
        }
        value = '00' + value;
        return value.substr(-2);
      }

      function modelToView(modelValue) {
        return {
          hours: formatInput(Math.floor(modelValue / MILISECONDS_IN_ONE_HOUR), 23),
          minutes: formatInput(Math.floor((modelValue % MILISECONDS_IN_ONE_HOUR) / MILISECONDS_IN_ONE_MINUTE), 59)
        };
      }

      function viewToModel(viewValue) {
        return (viewValue.hours * MILISECONDS_IN_ONE_HOUR) + (viewValue.minutes * MILISECONDS_IN_ONE_MINUTE);
      }

      function render() {
        scope.hours = ngModel.$viewValue.hours;
        scope.minutes = ngModel.$viewValue.minutes;
      }

      function onInputChange() {
        ngModel.$setViewValue({
          hours: formatInput(scope.hours, 23),
          minutes: formatInput(scope.minutes, 59)
        });
        ngModel.$render();
      }
    }
  }

})(angular);
