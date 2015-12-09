'use strict';

angular.module('biasesApp')
  .controller('ResultsCtrl', function($scope, $http, socket) {

    $scope.type;
    $scope.query = {
      start: null,
      end: null
    };
    $scope.recording;
    $scope.viewing;

    $scope.init = function(){
      $scope.recording = false;
      $scope.query = {
        start: null,
        end: null
      };
      $scope.type = 'Your'
      $scope.recording = false;
      $scope.viewing = false;
    }

    $scope.init();


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

    $scope.view = function(type) {
      var query = {
        url: '/api/anchors',
        method: "GET",
        params: {
          start: $scope.query.start,
          end: $scope.query.end
        }
      }
      if(type == 'all'){
        delete query.params.start;
        delete query.params.end;
        $scope.type = 'All'
      }
      $scope.viewing = true;
      $http(query).success(function(entries) {
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
      scaleFontColor: "#FFF",
    }
      new Chart(ctx).Scatter(data, options);
    }

    $scope.reset = function(){
      $scope.init();
    }
  });
