(function () {
    'use strict';

    angular.module('ShoppingListPromiseApp', []) 
        .controller('ShoppingListController', ShoppingListController)
        .service('ShoppingListService', ShoppingListService)
        .service('WeightLossFilterService', WeightLossFilterService);

    ShoppingListController.$inject = ['ShoppingListService'];   
    function ShoppingListController(ShoppingListService) {
        var list = this;

        list.items = ShoppingListService.getItems();

        list.itemName = "";
        list.itemQuantity = "";

        list.addItem = function() {
            ShoppingListService.addItem(list.itemName, list.itemQuantity);
        };

        list.removeItem = function(itemIndex) {
            ShoppingListService.removeItem(itemIndex);
        };
    }

    ShoppingListService.$inject = ['$q', 'WeightLossFilterService']
    function ShoppingListService($q, WeightLossFilterService) {
        var service = this;

        var items = [];

        service.getItems = function () {
            return items;
          };

        // this is a messy option
/*        service.addItem = function(name, quantity) {
            var promise = WeightLossFilterService.checkName(name);

            promise.then(function(response) {
                var nextPromise = WeightLossFilterService.checkQuantity(quantity);

                nextPromise.then(function(result) {
                    var item = {
                        name: name,
                        quantity: quantity
                    };
                    items.push(item);
                }, function(errorResponse) {
                    console.log(errorResponse.message);
                });
            }, function(errorResponse) {
                console.log(errorResponse.message);
            });
        };
*/
        // better but we still need to wait for response from all promises
/*        service.addItem = function(name, quantity) {
            var promise = WeightLossFilterService.checkName(name);

            promise.then(function(response) {
                return WeightLossFilterService.checkQuantity(quantity);
            })
            .then(function(response) {
                var item = {
                    name: name,
                    quantity: quantity
                };
                items.push(item);
            })
            .catch(function(errorResponse) {
                console.log(errorResponse.message);
            });
        };
    */   
        service.addItem = function(name, quantity) {
            var namePromise = WeightLossFilterService.checkName(name);
            var quantityPromise = WeightLossFilterService.checkQuantity(quantity);

            // when any of the promises result rejection - all promises all canceled imidiately
            $q.all([namePromise, quantityPromise])
                .then(function(response) {
                    var item ={
                        name: name,
                        quantity: quantity
                    }
                    items.push(item);   
                })
                .catch(function(errorResponse) {
                    console.log(errorResponse.message);
                });
        };
    }

    WeightLossFilterService.$inject = ['$q', '$timeout'];
    function WeightLossFilterService($q, $timeout) {
        var service = this;

        service.checkName = function(name) {
            var deffered = $q.defer();

            var result = {
                message: ""
            };

            $timeout(function() {
                if (name.toLowerCase().indexOf('cookie') === -1) {
                    deffered.resolve(result);
                } else {
                    result.message = "Stay away from cookies!";
                    deffered.reject(result);
                }
            }, 3000);
            return deffered.promise;
        };

        service.checkQuantity = function(quantity) {
            var deffered = $q.defer();

            var result = {
                message: ""
            };

            $timeout(function() {
                if (quantity < 6) {
                    deffered.resolve(result);
                } else {
                    result.message = "That is too much!";
                    deffered.reject(result);
                }
            }, 1000);
            return deffered.promise;
        };
    }

})();