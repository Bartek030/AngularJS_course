/*(function () {
    'use strict';

    angular.module('DIApp', []) 
        // adding $scope and $filter here protect them from minify
        .controller('DIController', ['$scope', '$filter', DIController]);

    // $filter - create filtering functions to format data displayed to user 
    function DIController ($scope, $filter) {
        $scope.name = "Somename";

        $scope.upper = function() {
            // uppercase - type of filter
            var upCase = $filter('uppercase');
            $scope.name = upCase($scope.name);
        };

        console.log($injector.annotate(DIController));
    }

    function annotateMe(name, job, blah) {
        return "Blah!";
    }

    console.log(DIController.toString());
 
})();*/

(function () {
    'use strict';

    angular.module('DIApp', []) 
        .controller('DIController', DIController);

        // or inject them like that:
        DIController.$inject = ['$scope', '$filter'];
        
    function DIController ($scope, $filter) {
        $scope.name = "Somename";

        $scope.upper = function() {
            /* uppercase - type of filter */
            var upCase = $filter('uppercase');
            $scope.name = upCase($scope.name);
        };
    }
})();