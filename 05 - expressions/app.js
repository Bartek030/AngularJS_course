(function () {
    'use strict';

    angular.module('MsgApp', []) 
        .controller('MsgController', MsgController);

    MsgController.$inject = ['$scope'];
        
    function MsgController ($scope) {
        $scope.name = "Somename";

        $scope.mood = "sad";

        $scope.sayMessage = function() {
            return "Someone like to eat healthy."
        };

        $scope.makeHappy = function() {
            $scope.mood = "happy";
        };
    }
})();