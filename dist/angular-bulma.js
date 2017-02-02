(function (angular) {

  angular
    .module('bulma', [
      'bulma.directives',
      'bulma.services',
    ]);

})(angular);

(function (angular) {

  angular
    .module('bulma.directives', []);

})(angular);

(function (angular) {

  angular
    .module('bulma.services', []);

})(angular);

(function (angular) {

  var DEFAULT_OPTIONS = {
    clearLabel: 'Clear',
    locale: {
      separator: ' - ',
      format: 'YYYY-MM-DD'
    }
  };

  angular
    .module('bulma.directives')
    .directive('buDaterangepicker', buDaterangepicker);

  buDaterangepicker.$inject = ['$compile', '$timeout', '$parse'];

  function buDaterangepicker($compile, $timeout, $parse) {
    var directive = {
      require: 'ngModel',
      restrict: 'E',
      replace: true,
      scope: {
        min: '=',
        max: '=',
        model: '=ngModel',
        options: '=',
        clearable: '='
      },
      template: '<input class="input">',
      link: link
    };

    return directive;

    ///

    function link($scope, element, attrs, modelCtrl) {
      var mergeOptions = function() {
        var extend, localeExtend;
        localeExtend = angular.extend.apply(angular, Array.prototype.slice.call(arguments).map(function(opt) {
          return opt != null ? opt.locale : void 0;
        }).filter(function(opt) {
          return !!opt;
        }));
        extend = angular.extend.apply(angular, arguments);
        extend.locale = localeExtend;
        return extend;
      };

      var el = jQuery(element);
      var customOptions = $scope.options;
      var options = mergeOptions({}, DEFAULT_OPTIONS, customOptions);
      var picker = null;

      var clear = function() {
        if (picker) {
          picker.setStartDate();
          picker.setEndDate();
        }
      };

      var setDatePoint = function(setter) {
        return function(newValue) {
          if (picker && newValue) {
            setter(moment(newValue));
          }
        };
      };

      var setStartDate = setDatePoint(function(m) {
        if (picker.endDate < m) {
          picker.setEndDate(m);
        }
        options.startDate = m;
        picker.setStartDate(m);
      });

      var setEndDate = setDatePoint(function(m) {
        if (picker.startDate > m) {
          picker.setStartDate(m);
        }
        options.endDate = m;
        picker.setEndDate(m);
      });

      var validate = function(validator) {
        return function(boundary, actual) {
          if (boundary && actual) {
            return validator(moment(boundary), moment(actual));
          } else {
            return true;
          }
        };
      };

      var validateMin = validate(function(min, start) {
        return min.isBefore(start) || min.isSame(start, 'day');
      });

      var validateMax = validate(function(max, end) {
        return max.isAfter(end) || max.isSame(end, 'day');
      });

      modelCtrl.$formatters.push(function(objValue) {
        var f = function(date) {
          if (!moment.isMoment(date)) {
            return moment(date).format(options.locale.format);
          } else {
            return date.format(options.locale.format);
          }
        };

        if (options.singleDatePicker && objValue) {
          return f(objValue);
        } else if (objValue.startDate) {
          return [f(objValue.startDate), f(objValue.endDate)].join(options.locale.separator);
        } else {
          return '';
        }
      });

      modelCtrl.$render = function() {
        if (modelCtrl.$modelValue && modelCtrl.$modelValue.startDate) {
          setStartDate(modelCtrl.$modelValue.startDate);
          setEndDate(modelCtrl.$modelValue.endDate);
        } else {
          clear();
        }

        el.val(modelCtrl.$viewValue);
      };

      modelCtrl.$parsers.push(function(val) {
        var f = function(value) {
          return moment(value, options.locale.format);
        };

        var objValue = {
          startDate: null,
          endDate: null
        };

        if (angular.isString(val) && val.length > 0) {
          if (options.singleDatePicker) {
            objValue = f(val);
          } else {
            var parts = val.split(options.locale.separator).map(f);
            objValue.startDate = parts[0];
            objValue.endDate = parts[1];
          }
        }

        return objValue;
      });

      modelCtrl.$isEmpty = function(val) {
        return !(angular.isString(val) && val.length > 0);
      };

      var init = function() {
        el.daterangepicker(angular.extend(options, {
          autoUpdateInput: false
        }), function(start, end) {
          $scope.$apply(function() {
            $scope.model = options.singleDatePicker ? start : {
              startDate: start,
              endDate: end
            };
          });
        });

        picker = el.data('daterangepicker');

        var results = [];
        var eventType;
        for (eventType in options.eventHandlers) {
          if (options.eventHandlers.hasOwnProperty(eventType)) {
            results.push(el.on(eventType, function(e) {
              var eventName;
              eventName = e.type + '.' + e.namespace;
              $scope.$evalAsync(options.eventHandlers[eventName]);
            }));
          }
        }
      };

      init();

      $scope.$watch('model.startDate', function(n) {
        setStartDate(n);
      });

      $scope.$watch('model.endDate', function(n) {
        setEndDate(n);
      });

      var initBoundaryField = function(field, validator, modelField, optName) {
        if (attrs[field]) {
          modelCtrl.$validators[field] = function(value) {
            return value && validator(options[optName], value[modelField]);
          };
          $scope.$watch(field, function(date) {
            options[optName] = date ? moment(date) : false;
            init();
          });
        }
      };

      initBoundaryField('min', validateMin, 'startDate', 'minDate');
      initBoundaryField('max', validateMax, 'endDate', 'maxDate');

      if (attrs.options) {
        $scope.$watch('options', function(newOptions) {
          options = mergeOptions(options, newOptions);
          init();
        }, true);
      }

      if (attrs.clearable) {
        $scope.$watch('clearable', function(newClearable) {
          if (newClearable) {
            options = mergeOptions(options, {
              locale: {
                cancelLabel: options.clearLabel
              }
            });
          }

          init();

          if (newClearable) {
            el.on('cancel.daterangepicker', function() {
              $scope.$apply(function() {
                $scope.model = options.singleDatePicker ? null : {
                  startDate: null,
                  endDate: null
                };
              });
            });
          }
        });
      }

      $scope.$on('$destroy', function() {
        if (picker) {
          picker.remove();
        }
      });
    }
  }

})(angular);

(function (angular) {

  angular
    .module('bulma.directives')
    .directive('buDropdown', buDropdown);

  buDropdown.$inject = ['$window', '$document'];

  function buDropdown($window, $document) {
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
        if ($window.getComputedStyle(body[0], null).display === 'none') {
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

(function (angular) {

  angular
    .module('bulma.services')
    .provider('buAlert', buAlertProvider);

  function buAlertProvider() {
    var containerSelector = 'body';

    this.containerSelector = function(newSelector) {
      containerSelector = newSelector;
    };

    this.$get = ['$document', buAlert];

    ///

    function buAlert($document) {
      var container = $document.find(containerSelector);

      var alert = {
        show: show,
      };

      return alert;

      ///

      function show(message) {
        var modal = angular.element(
          '<div class="modal is-active alert">' +
            '<div class="modal-background"></div>' +
            '<div class="modal-content">' +
              '<p class="subtitle">' + message + '</p>' +
            '</div>' +
          '</div>'
        );

        container.append(modal);
      }
    }

  }

})(angular);
