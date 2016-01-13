/**
 * Created by v.leonetti on 02/08/2015.
 */
/* controllers */

'use strict';

var bankControllers = angular.module('bankControllers', []);

bankControllers.controller('MainCtrl', ['$scope', '$location', '$http', 'BankMovement', 'checkCreds',
    function MainCtrl($scope, $location, $http, BankMovement, checkCreds){
        if (!checkCreds()){
            $location.path('/login');
            return;
        }

        console.log("CONTINUA - MAINCTRL");
        $scope.message = 'Elenco Movimenti';
        $scope.movements = [];
        $scope.messageResponse = '';

        var paramObject = new Object();
        //paramObject.tipo = "O";
        //add behavior
        //add method to scope
        var req = JSON.stringify(paramObject);

        console.log("getMovements");
        BankMovement.get({data:req},
            function success(response) {
                console.log("Success:" + JSON.stringify(response));
                $scope.movements = response.info;
            },
            function error(errorResponse) {
                console.log("Error:" + JSON.stringify(errorResponse));
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
            //$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
            var req = JSON.stringify($scope.movement);
            console.log(req);
            var jdata = 'data='+req;

            BankMovement.save({data:req},
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

function doTransform(value){
    console.log('doTransform -->' + value);
}

function appendTransform(defaults, transform) {

    // We can't guarantee that the default transformation is an array
    defaults = angular.isArray(defaults) ? defaults : [defaults];

    // Append the new transformation to the defaults
    return defaults.concat(transform);
}

bankControllers.controller('AggiornaMovimentoCtrl',
    ['$scope', '$location', '$http', 'BankMovement', 'checkCreds', 'getToken','$routeParams',
        function AggiornaMovimentoCtrl($scope, $location, $http, BankMovement, checkCreds, getToken, $routeParams){
            if (!checkCreds()){
                $location.path('/login');
                return;
            }
            $scope.message = 'Aggiorna Movimento';
            $scope.movement = new Object();
            $scope.messageResponse = '';

            $('#datetimeOperazione').datetimepicker({

            });


            BankMovement.get({},
                function success(response) {
                    console.log("Success:" + JSON.stringify(response));
                    var movements = response.info;
                    movements.forEach(function(movm){
                        if (movm._id === $routeParams.id){
                            $scope.movement = movm;
                            if ($scope.movement.dataOperazione)
                                $scope.movement.dataOperazione = new Date($scope.movement.dataOperazione);
                        }
                    });
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
                //$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
                var req = JSON.stringify($scope.movement);
                console.log(req);
                var jdata = 'data='+req;

                BankMovement.update({data:req},
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
    ['$scope', '$location', 'Login', 'setCreds',
        function LoginCtrl($scope, $location, Login, setCreds) {
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
                        if(response.authenticated){
                            setCreds($scope.username, $scope.password);
                            $location.path('/');
                        }else{
                            $scope.error = "Login Failed";
                        }
                    },
                    function error(errorResponse) {
                        console.log("Error:" + JSON.stringify(errorResponse));
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