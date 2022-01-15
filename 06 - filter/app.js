(function () {
    'use strict';

    angular.module('MsgApp', []) 
        .controller('MsgController', MsgController);

    // Filters can change data from input etc.
    MsgController.$inject = ['$scope', '$filter'];
        
    function MsgController ($scope, $filter) {
        $scope.name = "Somename";
        $scope.mood = "sad";
        $scope.numberOfMoney = .45;

        $scope.sayMessage = function() {
            var message = "Someone like to eat healthy.";
            // uppercase - change all string value to uppercase
            // more examples - https://docs.angularjs.org/api/ng/filter
            var output = $filter('uppercase')(message);
            return output;
        };

        $scope.makeHappy = function() {
            $scope.mood = "happy";
        };
    }
})();