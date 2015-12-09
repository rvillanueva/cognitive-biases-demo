'use strict';

angular.module('biasesApp')
  .controller('EditCtrl', function ($scope, $http, Auth) {
    $scope.points = [];

    $scope.getPoints = function(){
      $http.get('/api/anchors').success(function(data){
        $scope.points = data;
        console.log('Success!');
      }).error(function(err){
        console.log('Error: ' + err);
      })
    }

    $scope.delete = function(id){
      var check = window.confirm("Are you sure you want to delete this point?")
      if(check){
        $http.delete('/api/anchors/' + id).success(function(data){
          $scope.points = data;
          console.log('Success!');
          $scope.getPoints();
        }).error(function(err){
          console.log('Error: ' + err);
        })
      }
    }

    $scope.isAdmin = Auth.isAdmin();

    $scope.getPoints();

  });
