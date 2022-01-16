(function () {
    'use strict';

    angular.module('BindingApp', []) 
        .controller('BindingController', BindingController);

    BindingController.$inject = ['$scope'];
        
    function BindingController ($scope) {
        $scope.firstName = "SomeFirstName";
        // for 1-way binding it will not update on the UI
//        $scope.fullName = "";

        $scope.showNumberOfWatchers = function() {
            console.log("# of Watchers: ", $scope.$$watchersCount);
        }

        // it will be updated only once - by :: in HTML watchers will be removed
        $scope.setFullName = function() {
            $scope.fullName = $scope.firstName + " " + "SomeLastName";
        };

        $scope.logFirstName = function() {
            console.log("First name is: ", $scope.firstName);
        };

        $scope.logFullName = function() {
            console.log("Full name is: ", $scope.fullName);
        };
    }
})();