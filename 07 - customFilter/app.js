(function () {
    'use strict';

    angular.module('MsgApp', []) 
        .controller('MsgController', MsgController)
        .filter('loves', lovesFilter)
        .filter('truth', truthFilter);

    // Adding custom filter #1-2
    MsgController.$inject = ['$scope', 'lovesFilter'];
    // Adding custom filter #2-2
    function MsgController ($scope, lovesFilter) {
        $scope.mood = "sad";

        $scope.sayMessage = function() {
            var message = "Someone likes to eat healthy.";
            return message;
        };

        $scope.sayLovesMessage = function() {
            var message = "Someone likes to eat healthy.";
            // Using custom filter
            message = lovesFilter(message);
            return message;
        };

        $scope.makeHappy = function() {
            $scope.mood = "happy";
        };
    }

    // Custom filter factory
    function lovesFilter() {
        return function(input) {
            input = input || "";
            input = input.replace("likes", "loves");
            return input;
        }
    }

    // Second custom filter - no need to inject if used directly in HTML
    function truthFilter() {
        return function(input, target, repalce) {
            input = input || "";
            input = input.replace(target, repalce);
            return input;
        }
    }
})();