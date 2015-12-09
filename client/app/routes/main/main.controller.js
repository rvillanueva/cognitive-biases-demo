'use strict';

angular.module('biasesApp')
  .controller('MainCtrl', function($scope, $http) {

    $scope.range = {
      high: null,
      low: null
    }
    $scope.guess = {
      range: {
        high: $scope.high,
        low: $scope.low
      }
    };
    $scope.anchorPoint = null;
    $scope.step = 0;

    $scope.init = function() {
      $scope.chooseRange();
    }

    //Choose range
    $scope.chooseRange = function() {
      var flip = Math.random();
      if (flip > .5) {
        $scope.range.low = 0;
        $scope.range.high = 200;
      } else {
        $scope.range.low = 200;
        $scope.range.high = 400;
      }
    }

    $scope.chooseAnchor = function() {
      $scope.guess.anchor = $scope.range.low + Math.floor(Math.random() * ($scope.range.high - $scope.range.low));
      $scope.step = 1;
    }

    $scope.chooseDirection = function(direction) {
      $scope.guess.direction = direction;
      $scope.step = 2;
    }

    $scope.choose = function() {
      $scope.guess.choice = $scope.choice;
      $scope.step = 2;
    }

    $scope.submit = function() {
      console.log(typeof $scope.guess.choice)
      if(typeof $scope.guess.choice == 'number' && $scope.guess.choice){
        $http.post('/api/anchors', $scope.guess)
          .success(function() {
            $scope.step = 3;
            console.log('Success!')
          })
          .error(function(err) {
            window.alert('Error: ' + err)
          })
      }

    }

    $scope.init();


  });
