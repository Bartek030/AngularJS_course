(function () {
    'use strict';

    angular.module('ShoppingListComponentApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .factory('ShoppingListFactory', ShoppingListFactory)
        .component('shoppingList', {
            templateUrl: 'shoppingList.html',
            controller: ShoppingListComponentController,
            bindings: {
                items: '<',
                myTitle: '@title',
                onRemove: '&'
            }
        });

    ShoppingListComponentController.$inject = [/*'$scope', */'$element']
    function ShoppingListComponentController(/*$scope, */$element) {
        var $ctrl = this;
        var totalItems;

        $ctrl.cookiesInList = function() {
            for (var i = 0; i < $ctrl.items.length; i++) {
                var name = $ctrl.items[i].name;
                if(name.toLowerCase().indexOf("cookie") !== -1) {
                    return true;
                }
            }
            return false;
        };

        $ctrl.remove = function(myIndex) {
            // index - name from template
            $ctrl.onRemove({index: myIndex});
        };

        $ctrl.$onInit = function() {
            //console.log("We are in $onInit();");
            totalItems = 0;
        };

        $ctrl.$onChanges = function(changeObj) {
            console.log("Changes: ", changeObj);
        };

        $ctrl.$doCheck = function() {
            if($ctrl.items.length !== totalItems) {
                console.log("# of items change. Checking for cookies");
                totalItems = $ctrl.items.length;
                if($ctrl.cookiesInList()) {
                    console.log("Cookies detected");
                    var warningElement = $element.find('div.error');
                    warningElement.slideDown(900);
                } else {
                    console.log("No cookies here!");
                    var warningElement = $element.find('div.error');
                    warningElement.slideUp(900);
                }
            }
        };

        // same as link in directives
/*        $ctrl.$postLink = function() {
            $scope.$watch('$ctrl.cookiesInList()', function(newValue, OldValue) {
                console.log($element);
                if(newValue === true) {
                    var warningElement = $element.find('div.error');
                    warningElement.slideDown(900);
                } else {
                    var warningElement = $element.find('div.error');
                    warningElement.slideUp(900);
                }
            });
        };
*/    
    }

    ShoppingListController.$inject = ['ShoppingListFactory'];
    function ShoppingListController(ShoppingListFactory) {
        var list = this;

        // Use factory to create new shopping list service
        var shoppingList = ShoppingListFactory();

        list.items = shoppingList.getItems();

        var originalTitle = "Shopping List #1";
        list.title = originalTitle + " (" + list.items.length + " items)";

        list.warning = "COOKIES DETECTED";

        list.itemName = "";
        list.itemQuantity = "";

        list.addItem = function () {
            shoppingList.addItem(list.itemName, list.itemQuantity);
            list.title = originalTitle + " (" + list.items.length + " items)";
        }

        list.removeItem = function (itemIndex) {
            console.log("'this' is: ", this);
            this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
            shoppingList.removeItem(itemIndex);
            list.title = originalTitle + " (" + list.items.length + " items)";
        };
    }

    function ShoppingListService(maxItems) {
        var service = this;

        var items = [];

        service.addItem = function (itemName, quantity) {
            if ((maxItems === undefined) ||
                (maxItems !== undefined) && (items.length < maxItems)) {
                var item = {
                    name: itemName,
                    quantity: quantity
                };
                items.push(item);
            }
            else {
                throw new Error("Max items (" + maxItems + ") reached.");
            }
        };

        service.removeItem = function (itemIndex) {
            items.splice(itemIndex, 1);
        };

        service.getItems = function () {
            return items;
        };
    }


    function ShoppingListFactory() {
        var factory = function (maxItems) {
            return new ShoppingListService(maxItems);
        };

        return factory;
    }

})();