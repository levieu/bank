/**
 * Created by v.leonetti on 01/08/2015.
 */
/* App module*/

/* With strict mode, you can not, for example, use undeclared variables
 Strict mode is supported in:
 Internet Explorer from version 10. Firefox from version 4.
 Chrome from version 13. Safari from version 5.1. Opera from version 12.
 */
'use strict';


var bankApp = angular.module('bankApp', [
    'ngRoute', /* provided routing for application*/
    'bankControllers',
    'bankServices',
    'bankBusinessServices',
    'bankDirectives'
]);

bankApp.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function($routeProvider, $locationProvider, $httpProvider){
        $routeProvider.
            when('/',{
                templateUrl: 'template/ditbit.html',
                controller: 'MainCtrl'
            }).
            when('/inserisciMovimento',{
                templateUrl: 'template/inserisciMovimento.html',
                controller: 'InserisciMovimentoCtrl'
            }).
            when('/modificaMovimento/:id',{
                templateUrl: 'template/inserisciMovimento.html',
                controller: 'AggiornaMovimentoCtrl'
            }).
            when('/ricerca',{
                templateUrl: 'template/ricerca.html',
                controller: 'RicercaCtrl'
            }).
            when('/risultatoRicerca',{
                templateUrl: 'template/risultatoRicerca.html',
                controller: 'RisultatoRicercaCtrl'
            }).
            when('/risultatoRicerca/:message',{
                templateUrl: 'template/risultatoRicerca.html',
                controller: 'RisultatoRicercaCtrl'
            }).
            when('/dettaglioRicerca/:id',{
                templateUrl: 'template/dettaglioRicerca.html',
                controller: 'DettaglioRicercaCtrl'
            }).
            when('/login',{
                templateUrl: 'template/login.html',
                controller: 'LoginCtrl'
            }).
            when('/logout',{
                templateUrl: 'template/login.html',
                controller: 'LogoutCtrl'
            });
        /* use locationProvider service, the next line turns off HTML5Mode
         and turns on the hashbang mode of AngularJs. The urls like
         /someAppName/#!/blogPost/5 use the #! known as the hashbang instead of urls like
         /someAppName/blogPost/5 used by HTML5 mode.
         */
        $locationProvider.html5Mode(false).hashPrefix('!');

        $httpProvider.interceptors.push('authInterceptor');
    }
]);





