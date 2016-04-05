/**
 * Created by levieu on 11/12/15.
 */
'use strict';
/* Services */
var bankServices = angular.module('bankServices', ['ngResource']);
bankServices.factory('BankMovement', ['$resource',
    function ($resource) {
        return $resource("http://localhost:3000/ditbit/services", {}, {
            get: {method: 'GET', cache: false, isArray: false},
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
/*
bankServices.factory('authInterceptor', ['$resource',
    function($resource) {
        return $resource("http://localhost:3000/ditbit/login", {}, {
            login: {method: 'POST', cache: false, isArray: false}
        });
    }]);
*/
bankServices.factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        responseError: function (rejection) {
            if (rejection.status === 401) {
                // handle the case where the user is not authenticated
            }
            return $q.reject(rejection);
        }
    };
});