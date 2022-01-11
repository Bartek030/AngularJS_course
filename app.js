(function() {
   'use strict';

   angular.module('myFirstApp', []) // connecting to html view

   .controller('MyFirstController', function($scope) { // $scope - special variable for AngularJS
      $scope.name = "SomeName";
      $scope.sayHello = function() {
         return "Hello AngularJS";
      }
   });



})();