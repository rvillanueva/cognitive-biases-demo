'use strict';

angular.module('biasesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/edit', {
        templateUrl: 'app/routes/edit/edit.html',
        controller: 'EditCtrl'
      });
  });
