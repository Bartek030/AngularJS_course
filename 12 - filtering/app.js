(function () {
    'use strict';

    var shoppingList = ["Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter", "Pepto Bismol", "Pepro Bismol (Chocolate flavor)", "Pepro Bismol (Cookie flavor)"];

    angular.module('ShoppingListApp', []) 
        .controller('ShoppingListController', ShoppingListController);

    ShoppingListController.$inject = ['$scope'];
        
    function ShoppingListController ($scope) {
        $scope.shoppingList = shoppingList;
    }
})();