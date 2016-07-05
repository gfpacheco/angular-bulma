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

  buDropdown.$inject = ['$document'];

  function buDropdown($document) {
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
        if (body.css('display') === 'none') {
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

      function formatInput(value) {
        value = ('' + value).replace(/[^0-9]/, '');
        value = '00' + value;
        return value.substr(-2);
      }

      function modelToView(modelValue) {
        return {
          hours: formatInput(modelValue.getHours()),
          minutes: formatInput(modelValue.getMinutes())
        };
      }

      function viewToModel(viewValue) {
        var time = new Date();
        time.setHours(parseInt(viewValue.hours, 10));
        time.setMinutes(parseInt(viewValue.minutes, 10));
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
          hours: formatInput(scope.hours),
          minutes: formatInput(scope.minutes)
        });
        ngModel.$render();
      }
    }
  }

})(angular);
