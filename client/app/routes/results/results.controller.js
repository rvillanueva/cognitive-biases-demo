'use strict';

angular.module('biasesApp')
  .controller('ResultsCtrl', function($scope, $http, socket) {

    $scope.recording = false;
    $scope.query = {
      start: null,
      end: null
    };

    $scope.start = function() {
      $scope.recording = true;
      $scope.query.start = new Date();
    }

    $scope.end = function() {
      $scope.recording = false;
      $scope.query.end = new Date();
      $scope.session = {
        start: $scope.query.start,
        end: $scope.query.end
      }
      $http.post('/api/sessions', $scope.session).success(function(){
        console.log('Success!');
      }).error(function(err){
        console.log('Error: ' + err);
      })
      $scope.view();
    }

    $scope.view = function() {
      $scope.viewing = true;
      $http({
        url: '/api/anchors',
        method: "GET",
        params: {
          start: $scope.query.start,
          end: $scope.query.end
        }
      }).success(function(entries) {
        console.log(entries);
        var points = [];
        angular.forEach(entries, function(entry, index){
          var point = {
            x: entry.anchor,
            y: entry.choice
          }
          points.push(point);
        })
        $scope.generateChart(points);
      }).error(function(err) {
        window.alert('Error: ' + err)
      })
    }

    $scope.generateChart = function(points){
      // Get the context of the canvas element we want to select
      var ctx = document.getElementById("myChart").getContext("2d");
      var data =     [{
      strokeColor: '#F16220',
      pointColor: '#F16220',
      pointStrokeColor: '#fff',
      data: points
    }]
    var options = {
      datasetStroke: false,
      scaleLineColor: "rgba(255,255,255,1)",
    }
      new Chart(ctx).Scatter(data, options);
    }

    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if ($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', {
        name: $scope.newThing
      });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  });
