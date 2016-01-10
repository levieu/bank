/**
 * Created by levieu on 18/12/15.
 */
'use strict';
/* Directives */
var bankDirectives =
    angular.module('bankDirectives', []);
bankDirectives.directive('bankMenu', function () {
    return {
        restrict: 'A',
        templateUrl: 'partials/menu.html',
        link: function (scope, el, attrs) {
            scope.label = attrs.menuTitle;
        }
    };
});