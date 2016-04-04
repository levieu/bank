/**
 * Created by levieu on 11/12/15.
 */
'use strict';
/* Services */
var bankServices = angular.module('bankServices', ['ngResource']);
bankServices.factory('BankMovement', ['$resource',
    function ($resource) {
        return $resource("http://localhost:3000/ditbit/services", {}, {
            get: {method: 'GET', cache: false, isArray: true},
            save: {method: 'POST', cache: false, isArray: false},
            update: {method: 'PUT', cache: false, isArray: false},
            delete: {method: 'DELETE', cache: false, isArray: false},
            call: {method: 'POST', cache: false, isArray: false},
        });
    }]);

bankServices.factory('Login', ['$resource',
    function($resource) {
        return $resource("http://localhost:3000/ditbit/login", {}, {
                login: {method: 'POST', cache: false, isArray: false}
            });
    }]);