(function () {
    'use strict';

    angular.module('DIApp', []) // connecting to html view
        .controller('DIController', DIController);

    /* $filter - create filtering functions to format data displayed to user */
    function DIController ($scope, $filter, $injector) {
        $scope.name = "Somename";

        $scope.upper = function() {
            /* uppercase - type of filter */
            var upCase = $filter('uppercase');
            $scope.name = upCase($scope.name);
        };

        console.log($injector.annotate(DIController));
    }

    function annotateMe(name, job, blah) {
        return "Blah!";
    }

    console.log(DIController.toString());
 
})();