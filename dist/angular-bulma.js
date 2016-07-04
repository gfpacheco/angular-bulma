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
