/**
 * Created by v.leonetti on 02/08/2015.
 */
/* controllers */

'use strict';

var bankControllers = angular.module('bankControllers', []);

bankControllers.controller('MainCtrl', ['$scope', '$location', '$http', 'BankMovement', 'checkCreds', '$window',
    function MainCtrl($scope, $location, $http, BankMovement, checkCreds, $window){
        /*if (!checkCreds()){
            $location.path('/login');
            return;
        }*/

        console.log("CONTINUA - MAINCTRL");
        $scope.message = 'Elenco Movimenti';
        $scope.movements = [];
        $scope.messageResponse = '';

        var paramObject = {};
        //paramObject.tipo = "O";
        //add behavior
        //add method to scope
        var objectRequest = {};
        objectRequest.service = 'movement';
        objectRequest.method = 'find';
        objectRequest.data = paramObject;

        var req = JSON.stringify(objectRequest);

        //config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        //$http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.sessionStorage.token;
        console.log("getMovements");
        BankMovement.call({data:req},
            function success(response) {
                console.log("Success:" + JSON.stringify(response));
                $scope.movements = response.info;
            },
            function error(errorResponse) {
                console.log("Error:" + JSON.stringify(errorResponse));
                $location.path('/login');
                return;
            }
        );

        /*
        $http({
            method: 'GET',
            url: 'http://localhost:3000/unicorns'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log("success");
            $scope.movements = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("error: " +response );
        });
        */


    }
]);

bankControllers.controller('InserisciMovimentoCtrl',
    ['$scope', '$location', '$http', 'BankMovement', 'checkCreds', 'getToken',
    function InserisciMovimentoCtrl($scope, $location, $http, BankMovement, checkCreds, getToken){
        if (!checkCreds()){
            $location.path('/login');
            return;
        }
        $scope.message = 'Inserisci Movimento';
        $scope.movement = new Object();
        $scope.messageResponse = '';

        $('#datetimeOperazione').datetimepicker({

        });

        //$scope.descrizione = '';
        //$scope.importo = '';

        //add behavior
        //add method to scope

        $scope.addMovement = function(){
            console.log("addMovement");
            /*var obj = new Object();
            obj.name =  $scope.movement.descrizione ;
            obj.vampires =  $scope.movement.importo;*/
           // $http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
            var objData = {};
            objData.service = 'movement';
            objData.method = 'save';
            objData.data = $scope.movement;

            //var req = JSON.stringify($scope.movement);
            var req = JSON.stringify(objData);
            console.log(req);
            var jdata = 'data='+req;

            BankMovement.call({data:req},
                function success(response) {
                    console.log("Success:" + JSON.stringify(response));
                    $location.path('/');
                },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                    var tempMessage = errorResponse.data.esito;
                    if (errorResponse.data.error && errorResponse.data.error.errors){
                        tempMessage += " - " + errorResponse.data.error.message;
                        if (errorResponse.data.error.errors['importo'] !== undefined){
                            tempMessage += " - " + errorResponse.data.error.errors['importo'].message;
                        }
                        if (errorResponse.data.error.errors['dataOperazione'] !== undefined){
                            tempMessage += " - " + errorResponse.data.error.errors['dataOperazione'].message;
                        }
                    }
                    $scope.messageResponse = tempMessage;
                }
            );
            /*
            $http({
                method: 'POST',
                url: 'http://localhost:3000/unicorns',
                data: jdata,
                //processData: false,
                //headers: {'Content-Type': undefined } //'application/json' 'application/x-www-form-urlencoded'
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                responseType : 'json'

            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log("success" + response);
                $location.path('/');
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("error: " +response );
            });
            */
        };

    }
]);

bankControllers.controller('AggiornaMovimentoCtrl',
    ['$scope', '$location', '$http', 'BankMovement', 'checkCreds', 'getToken', '$routeParams',
        function AggiornaMovimentoCtrl($scope, $location, $http, BankMovement, checkCreds, getToken, $routeParams){
            if (!checkCreds()){
                $location.path('/login');
                return;
            }
            $scope.message = 'Aggiorna Movimento';
            $scope.movement = new Object();
            $scope.messageResponse = '';

            var request = {};
            request._id = $routeParams.id;

            var objData = {};
            objData.service = 'movement';
            objData.method = 'find';
            objData.data = request;
            var req = JSON.stringify(objData);
            console.log(req);

            BankMovement.call({data:req},
                function success(response) {
                    console.log("Success:" + JSON.stringify(response));
                    $scope.movement = response.info[0];
                },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                }
            );


            //$scope.descrizione = '';
            //$scope.importo = '';

            //add behavior
            //add method to scope

            $scope.addMovement = function(){
                console.log("addMovement");
                /*var obj = new Object();
                 obj.name =  $scope.movement.descrizione ;
                 obj.vampires =  $scope.movement.importo;*/
                // $http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
                var objData = {};
                objData.service = 'movement';
                objData.method = 'update';
                objData.data = $scope.movement;

                //var req = JSON.stringify($scope.movement);
                var req = JSON.stringify(objData);
                console.log(req);
                var jdata = 'data='+req;



                BankMovement.call({data:req},
                    function success(response) {
                        console.log("Success:" + JSON.stringify(response));
                        $location.path('/');
                    },
                    function error(errorResponse) {
                        console.log("Error:" + JSON.stringify(errorResponse));
                        var tempMessage = errorResponse.data.esito;
                        if (errorResponse.data.error && errorResponse.data.error.errors){
                            tempMessage += " - " + errorResponse.data.error.message;
                            if (errorResponse.data.error.errors['importo'] !== undefined){
                                tempMessage += " - " + errorResponse.data.error.errors['importo'].message;
                            }
                            if (errorResponse.data.error.errors['dataOperazione'] !== undefined){
                                tempMessage += " - " + errorResponse.data.error.errors['dataOperazione'].message;
                            }
                        }
                        $scope.messageResponse = tempMessage;
                    }
                );
            };

        }
    ]);

bankControllers.controller('RicercaCtrl', ['$scope', '$location', '$http',
    function RicercaCtrl($scope, $location, $http){
        $scope.message = 'Ricerca';
        //$scope.cMessage = '';

        //add behavior
        //add method to scope
        $scope.submit = function(){
            $location.path('/risultatoRicerca/' + $scope.message);
        };

        $scope.changeMessage = function(){
            $scope.message = $scope.cMessage;
        };

    }
]);

bankControllers.controller('RisultatoRicercaCtrl', ['$scope', '$location', '$http', '$routeParams',
    function RisultatoRicercaCtrl($scope, $location, $http, $routeParams){
        $scope.message = 'Risultato Ricerca' + ' - ' + $routeParams.message;

        $scope.elencoRicette = [
            {
                "_id": 1,
                "date": 1400623623107,
                "nre": "030A01"
            },
            {
                "_id": 2,
                "date": 1400623623107,
                "nre": "030A02"
            }
        ];
    }
]);

bankControllers.controller('DettaglioRicercaCtrl', ['$scope', '$location', '$http',
    function DettaglioRicercaCtrl($scope, $location, $http, $routeParams){
        $scope.message = 'Dettaglio Ricerca';

        var ricettaId = $routeParams.id;
        var ricetta1 = {
            "_id": 1,
            "date": 1400623623107,
            "nre": "030A01"
        };
        var ricetta2 = {
            "_id": 2,
            "date": 1400623623107,
            "nre": "030A02"
        };

        if(ricettaId === '1'){
            $scope.ricettaEntry = ricetta1;
        }else if(ricettaId === '2'){
            $scope.ricettaEntry = ricetta2;
        }
        $scope.ricettaEntry = ricetta1;
    }
]);

bankControllers.controller('LoginCtrl',
    ['$scope', '$location', 'Login', 'setCreds', '$window',
        function LoginCtrl($scope, $location, Login, setCreds, $window) {
            console.log("INIT - LOGINCTRL");
            $scope.submit = function(){
                $scope.sub = true;
                var postData = {
                    "username" : $scope.username,
                    "password" : $scope.password
                };

                Login.login({}, {data:JSON.stringify(postData)},
                    function success(response) {
                        console.log("Success:" + JSON.stringify(response));
                        $window.sessionStorage.token = response.token;
                        $location.path('/');
                        /*if(response.authenticated){
                            setCreds($scope.username, $scope.password);
                            $location.path('/');
                        }else{
                            $scope.error = "Login Failed";
                        }*/
                    },
                    function error(errorResponse) {
                        console.log("Error:" + JSON.stringify(errorResponse));
                        delete $window.sessionStorage.token;
                    }
                );
            };
        }]);

bankControllers.controller('LogoutCtrl',
    ['$location', 'deleteCreds',
        function LogoutCtrl($location, deleteCreds) {
            deleteCreds();
            $location.path('/login');
        }]);