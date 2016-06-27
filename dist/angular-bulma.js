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
      transclude: true,
      scope: {
        align: '@'
      },
      link: link,
      template: '<div class="bu-dropdown-body" ng-transclude></div>'
    };

    return directive;

    ///

    function link(scope, element) {
      element.on('click', toggle);

      var body = angular.element(element[0].querySelector('.bu-dropdown-body'));
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

      body.css(css);

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
