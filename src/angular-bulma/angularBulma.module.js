(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('angularBulma.config', [])
      .value('angularBulma.config', {
          debug: true
      });

  // Modules
  angular.module('angularBulma.directives', []);
  angular.module('angularBulma',
      [
          'angularBulma.config',
          'angularBulma.directives'
      ]);

})(angular);
