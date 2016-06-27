(function (angular) {

  angular
    .module('bulma.directives')
    .directive('buDropdown', buDropdown);

  buDropdown.$inject = ['$document'];

  function buDropdown($document) {
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
      element.on('click', toggle);

      var dropdown = angular.element(element[0].querySelector('.bu-dropdown'));
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

      function toggle() {
        if (dropdown.css('display') === 'none') {
          open();
        } else {
          close();
        }
      }

      function open() {
        dropdown.css('display', 'block');
        $document.on('click', close);
      }

      function close() {
        dropdown.css('display', 'none');
        $document.off('click', close);
      }

      scope.$on('$destroy', function() {
        $document.off('click', close);
      });
    }
  }

})(angular);
