/**
 * Created by levieu on 14/12/15.
 */
'use strict';
/* business logic services only */
var bankBusinessServices =  angular.module('bankBusinessServices', ['ngCookies']);

bankBusinessServices.factory('checkCreds',
    ['$cookies', function($cookies) {
        return function() {
            console.log("INIT CHECKCREDS");
            var returnVal = false;
            var bankCreds = $cookies.bankCreds;
            if (bankCreds !== undefined && bankCreds !== "") {
                returnVal = true;
            }
            return returnVal;
        };
    }]);

bankBusinessServices.factory('getToken',
    ['$cookies', function($cookies) {
        return function() {
            var returnVal = "";
            var bankCreds = $cookies.bankCreds;
            if (bankCreds !== undefined && bankCreds !== "") {
                returnVal = btoa(bankCreds);
            }
            return returnVal;
        };
    }]);

bankBusinessServices.factory('getUsername',
    ['$cookies', function($cookies) {
        return function() {
            var returnVal = "";
            var bankUsername = $cookies.bankUsername;
            if (bankUsername !== undefined && bankUsername !== "") {
                returnVal = bankUsername;
            }
            return returnVal;
        };
    }]);

bankBusinessServices.factory('setCreds',
    ['$cookies', function($cookies) {
        return function(un, pw) {
            var token = un.concat(":", pw);
            $cookies.bankCreds = token;
            $cookies.bankUsername = un;
        };
    }]);

bankBusinessServices.factory('deleteCreds',
    ['$cookies', function($cookies) {
        return function() {
            $cookies.bankCreds = "";
            $cookies.bankUsername = "";
        };
    }]);