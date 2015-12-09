'use strict';

angular.module('biasesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/results', {
        templateUrl: 'app/routes/results/results.html',
        controller: 'ResultsCtrl'
      });
  });
