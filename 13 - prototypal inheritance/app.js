(function () {
    'use strict';

    angular.module('ControllerAsApp', []) 
        .controller('ParentController1', ParentController1)
        .controller('ChildController1', ChildController1)
        .controller('ParentController2', ParentController2)
        .controller('ChildController2', ChildController2);

    ParentController1.$inject = ['$scope'];
        
    function ParentController1($scope) {
        $scope.parentValue = 1;
        $scope.pc = this;
        $scope.pc.parentValue = 1;
    }

    ChildController1.$inject = ['$scope'];
        
    function ChildController1($scope) {
 /*       console.log("$scope.parentValue: ", $scope.parentValue);
        console.log("CHILD $scope: ", $scope);

        // in primitive values parent value does not change with child value
        $scope.parentValue = 5;
        console.log("*** CHANGED: $scope.parentValue = 5 ***");
        console.log("$scope.parentValue: ", $scope.parentValue);
        console.log($scope);

        console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);
        $scope.pc.parentValue = 5;
        // in objects parent value is changing with child value
        console.log("*** CHANGED: $scope.pc.parentValue = 5; ***");
        console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);
        console.log("$scope: ", $scope);

        console.log("$scope.$parent.parentValue: ", $scope.$parent.parentValue);*/
    }

    // if we don't use $scope inside function we dont need to inject it
    /*ParentController2.$inject = ['$scope'];*/
        
    function ParentController2(/*$scope*/) {
        // we can use 'this' everywhere instead of parent and it is the same instance created in the HTML
        var parent = this;
        parent.value = 1;
    }

    ChildController2.$inject = ['$scope'];
        
    function ChildController2($scope) {
        var child = this;
        child.value = 5;
        console.log("ChildController2 $scope: ", $scope);
    }
})();