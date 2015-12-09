'use strict';

angular.module('biasesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/routes/main/main.html',
        controller: 'MainCtrl'
      });
  })
