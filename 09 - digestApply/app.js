(function () {
    'use strict';

    angular.module('CounterApp', []) 
        .controller('CounterController', CounterController);

    CounterController.$inject = ['$scope', '$timeout'];
        
    function CounterController ($scope, $timeout) {
        $scope.counter = 0;;

/*        $scope.upCounter = function() {
            setTimeout(function() {
                $scope.counter++;
                console.log("Counter incremented");
                // Digest Cycle does not get triggered automatically if events are unaware of Angular
                // watchers does not check if value is changing inside function like setTimeout
                // there is a need to watch it manually:
                $scope.$digest();
                // but it does not show i.e. an exception
            }, 2000);
        };
*/
/*        // so the better way is to use $apply
        $scope.upCounter = function() {
            setTimeout(function() {
                $scope.$apply(function() {
                    $scope.counter++;
                    console.log("Counter incremented");
                });
            }, 2000);
        };
*/
        // Tip: in AngularJS there is a setTimeout function:
        $scope.upCounter = function() {
            $timeout(function() {
                $scope.counter++;
                console.log("Counter incremented")
            }, 2000);
        };
    }
})();