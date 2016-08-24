/**
 * Created by v.leonetti on 02/08/2015.
 */
/* controllers */

'use strict';

var bankControllers = angular.module('bankControllers', []);

bankControllers.controller('MainCtrl', ['$scope', '$location', '$http', 'BankMovement', 'BankCategory', 'checkCreds', '$window',
    function MainCtrl($scope, $location, $http, BankMovement, BankCategory, checkCreds, $window){
        /*if (!checkCreds()){
            $location.path('/login');
            return;
        }*/

        console.log("CONTINUA - MAINCTRL");
        $scope.message = 'Elenco Movimenti';
        $scope.movements = [];
        $scope.messageResponse = '';
        $scope.totaleEntrate = 0;
        $scope.totaleUscite = 0;
        $scope.totale = 0;
        $scope.saldo = 0;
        $scope.filtro = {};

        $scope.openPopUpDataDal = function() {
            $scope.popupDataDal.opened = true;
        };

        $scope.popupDataDal = {
            opened: false
        };

        $scope.openPopUpDataAl = function() {
            $scope.popupDataAl.opened = true;
        };

        $scope.popupDataAl = {
            opened: false
        };

        var paramObject = {};
        paramObject.descrizione = $scope.filtro.descrizione;
        //paramObject.tipo = "O";
        //add behavior
        //add method to scope
        //var objectRequest = {};
        //objectRequest.service = 'movement';
        //objectRequest.method = 'find';
        //objectRequest.data = paramObject;

        //var req = JSON.stringify(objectRequest);

        //config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        //$http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.sessionStorage.token;
        console.log("getMovements");
        //BankMovement.find({data:req},
        BankMovement.find(paramObject,
            function success(response) {
                console.log("Success:" + JSON.stringify(response));
                $scope.movements = response.info;
                $scope.calcolaTotali(paramObject);
                $scope.calcolaSaldo();
            },
            function error(errorResponse) {
                console.log("Error:" + JSON.stringify(errorResponse));
                $location.path('/login');
                return;
            }
        );

        $scope.categorie = [];
        //var objectRequest2 = {};
        //objectRequest2.service = 'category';
        //objectRequest2.method = 'find';
        //objectRequest2.data = {};

        //var req2 = JSON.stringify(objectRequest2);

        //config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        //$http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.sessionStorage.token;
        console.log("getCategories");
        BankCategory.get({},
            function success(response) {
                console.log("Success:" + JSON.stringify(response));
                $scope.categorie = response.info;
            },
            function error(errorResponse) {
                console.log("Error:" + JSON.stringify(errorResponse));
                $scope.categorie = [];
            }
        );
        $scope.findCategoria = function(codice){
            var nome = codice;
            $scope.categorie.forEach(function(entry) {
                if (entry.codice === codice){
                    nome = entry.nome;
                    return;
                }
            });
            return nome;
        };

        $scope.reset = function(){
            $scope.filtro = {};

            var objectRequest = {};
            //objectRequest.service = 'movement';
            //objectRequest.method = 'find';
            objectRequest = $scope.filtro;

            //var req = JSON.stringify(objectRequest);

            BankMovement.find(objectRequest,
                function success(response) {
                    console.log("Success:" + JSON.stringify(response));
                    $scope.movements = response.info;
                    $scope.calcolaTotali(objectRequest);
                    $scope.calcolaSaldo();
                },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                    $location.path('/login');
                    return;
                }
            );
        };

        $scope.ricerca = function(){
            var paramObject = $scope.filtro;

            if (paramObject.dataAl){
                //var dataAl = new Date(paramObject.dataAl);
                paramObject.dataAl.setDate(paramObject.dataAl.getDate() + 1);
                //paramObject.dataOperazione = { $lte: dataAl };
            }

            //var objectRequest = {};
            //objectRequest.service = 'movement';
            //objectRequest.method = 'find';
            //objectRequest.data = paramObject;

            //var req = JSON.stringify(objectRequest);

            BankMovement.get(paramObject,
                function success(response) {
                    console.log("Success:" + JSON.stringify(response));
                    $scope.movements = response.info;
                    $scope.calcolaTotali(paramObject);
                    $scope.calcolaSaldo();
                },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                    $location.path('/login');
                    return;
                }
            );
        };

        $scope.calcolaSaldo = function(){
            BankMovement.calcolaSaldo({},
                function success(response) {
                    console.log("Success:" + JSON.stringify(response));
                    $scope.saldo = response.totale;
                },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                    return;
                }
            );
        };

        $scope.calcolaTotali = function(filter){
            var totIn = 0;
            var totOut = 0;
            /*if ($scope.movements.length != 0){
                $scope.movements.forEach(function(entry) {
                    if (entry.tipoOperazione){
                        if (entry.tipoOperazione === 'O'){
                            totOut += entry.importo;
                        }
                        else if (entry.tipoOperazione === 'I'){
                            totIn += entry.importo;
                        }
                    }
                });
            }*/
            BankMovement.calcolaTotale(filter,
                function success(response) {
                    console.log("Success:" + JSON.stringify(response));
                    $scope.totale = response.totale;
                },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                    return;
                }
            );

            $scope.totaleEntrate = totIn;
            $scope.totaleUscite = totOut;
        };


        $scope.delMovement = function(id){
            console.log("delMovement");
            /*var obj = new Object();
             obj.name =  $scope.movement.descrizione ;
             obj.vampires =  $scope.movement.importo;*/
            // $http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();

            var request = {};
            request._id = id;

            /*var objData = {};
            objData.service = 'movement';
            objData.method = 'delete';
            objData.data = request;*/

            //var req = JSON.stringify($scope.movement);
            //var req = JSON.stringify(objData);
            //console.log(req);
            //var jdata = 'data='+req;

            BankMovement.delete(request,
                function success(response) {
                    console.log("Success:" + JSON.stringify(response));
                    //var paramObject = {};
                    //paramObject.tipo = "O";
                    //add behavior
                    //add method to scope
                    //var objectRequest = {};
                    //objectRequest.service = 'movement';
                    //objectRequest.method = 'find';
                    //objectRequest.data = paramObject;

                    //var req = JSON.stringify(objectRequest);

                    BankMovement.find({},
                        function success(response) {
                            console.log("Success:" + JSON.stringify(response));
                            $scope.movements = response.info;
                            $scope.calcolaTotali();
                            $scope.calcolaSaldo();
                        },
                        function error(errorResponse) {
                            console.log("Error:" + JSON.stringify(errorResponse));
                            $location.path('/login');
                            return;
                        }
                    );
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

        $scope.verificaMovement = function(obj){
            console.log("addMovement");
            /*var obj = new Object();
             obj.name =  $scope.movement.descrizione ;
             obj.vampires =  $scope.movement.importo;*/
            // $http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();

            var objData = {};
            //objData.service = 'movement';
            //objData.method = 'update';
            objData = obj.movimento;

            //var req = JSON.stringify($scope.movement);
            //var req = JSON.stringify(objData);
            //console.log(req);
            //var jdata = 'data='+req;



            BankMovement.update(objData,
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
    ['$scope', '$location', '$http', 'BankMovement', 'BankCategory', 'checkCreds', 'getToken',
    function InserisciMovimentoCtrl($scope, $location, $http, BankMovement, BankCategory, checkCreds, getToken){
        /*if (!checkCreds()){
            $location.path('/login');
            return;
        }*/
        $scope.message = 'Inserisci Movimento';
        $scope.movement = new Object();
        $scope.messageResponse = '';

        $scope.tipiOperazione = {
            elencoOpzioni: [
                {id: 'I', name: 'Entrata'},
                {id: 'O', name: 'Uscita'}
            ],
        };

        $scope.tipiCarte = {
            elencoOpzioni: [
                {id: 'A', name: 'Assegno'},
                {id: 'B', name: 'Bancomat'},
                {id: 'C', name: 'Carta di Credito'},
                {id: 'D', name: 'Bonifico'}
            ],
        };

        $scope.categorie = [];

        //var objectRequest = {};
        //objectRequest.service = 'category';
        //objectRequest.method = 'find';
        //objectRequest.data = {};

        //var req = JSON.stringify(objectRequest);

        //config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        //$http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.sessionStorage.token;
        console.log("getCategories");
        BankCategory.get({},
            function success(response) {
                console.log("Success:" + JSON.stringify(response));
                $scope.categorie = response.info;
            },
            function error(errorResponse) {
                console.log("Error:" + JSON.stringify(errorResponse));
                $scope.categorie = [];
            }
        );

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.popup1 = {
            opened: false
        };

        /*$('#datetimeOperazione').datetimepicker({

        });*/

        //$scope.descrizione = '';
        //$scope.importo = '';

        //add behavior
        //add method to scope

        $scope.addModMovement = function(){
            console.log("addMovement");
            /*var obj = new Object();
            obj.name =  $scope.movement.descrizione ;
            obj.vampires =  $scope.movement.importo;*/
           // $http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
            var objData = {};
            //objData.service = 'movement';
            //objData.method = 'save';
            objData = $scope.movement;

            //var req = JSON.stringify($scope.movement);
            //var req = JSON.stringify(objData);
            //console.log(req);
            //var jdata = 'data='+req;

            BankMovement.save(objData,
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
    ['$scope', '$location', '$http', 'BankMovement', 'BankCategory', 'checkCreds', 'getToken', '$routeParams',
        function AggiornaMovimentoCtrl($scope, $location, $http, BankMovement, BankCategory, checkCreds, getToken, $routeParams){
            /*if (!checkCreds()){
                $location.path('/login');
                return;
            }*/
            $scope.message = 'Aggiorna Movimento';
            $scope.movement = new Object();
            $scope.messageResponse = '';

            $scope.tipiOperazione = {
                elencoOpzioni: [
                    {id: 'I', name: 'Entrata'},
                    {id: 'O', name: 'Uscita'}
                ],
            };

            $scope.tipiCarte = {
                elencoOpzioni: [
                    {id: 'A', name: 'Assegno'},
                    {id: 'B', name: 'Bancomat'},
                    {id: 'C', name: 'Carta di Credito'},
                    {id: 'D', name: 'Bonifico'}
                ],
            };

            $scope.categorie = [];

            //var objectRequest = {};
            //objectRequest.service = 'category';
            //objectRequest.method = 'find';
            //objectRequest.data = {};

            //var req = JSON.stringify(objectRequest);

            //config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            //$http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.sessionStorage.token;
            console.log("getCategories");
            BankCategory.get({},
                function success(response) {
                    console.log("Success:" + JSON.stringify(response));
                    $scope.categorie = response.info;
                },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                    $scope.categorie = [];
                }
            );

            $scope.open1 = function() {
                $scope.popup1.opened = true;
            };

            $scope.popup1 = {
                opened: false
            };

            var request = {};
            request._id = $routeParams.id;

            //var objData = {};
            //objData.service = 'movement';
            //objData.method = 'find';
            //objData.data = request;
            //var req = JSON.stringify(objData);
            //console.log(req);

            BankMovement.find(request,
                function success(response) {
                    console.log("Success:" + JSON.stringify(response));
                    var mov = response.info[0];
                    mov.dataOperazione = new Date(mov.dataOperazione);
                    $scope.movement = mov;
                },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                }
            );


            //$scope.descrizione = '';
            //$scope.importo = '';

            //add behavior
            //add method to scope

            $scope.addModMovement = function(){
                console.log("addMovement");
                /*var obj = new Object();
                 obj.name =  $scope.movement.descrizione ;
                 obj.vampires =  $scope.movement.importo;*/
                // $http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
                var objData = {};
                //objData.service = 'movement';
                //objData.method = 'update';
                objData = $scope.movement;

                //var req = JSON.stringify($scope.movement);
                //var req = JSON.stringify(objData);
                //console.log(req);
                //var jdata = 'data='+req;



                BankMovement.update(objData,
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
            $scope.errorMessage = '';
            $scope.submit = function(){
                $scope.sub = true;
                var postData = {
                    "username" : $scope.username,
                    "password" : $scope.password
                };
                //Login.login({}, {data:JSON.stringify(postData)},
                Login.login({}, postData,
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
                        $scope.errorMessage = errorResponse.data;
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