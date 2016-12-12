

angular.module('starter').controller('controller', ['$scope', 'service', '$ionicLoading', 
	'$location', '$timeout', '$localStorage', 
	function($scope, service, $ionicLoading, 
		$location, $timeout, $localStorage){


	$scope.licenca = {};

	$scope.licencaUsadas = {};

	$scope.$storage = $localStorage.$default({
          ativo: false
     });

	$scope.atualizaStatus = function(){

		// if(ativo){
		// 	console.log("ativo");
		// }else{
		// 	console.log("desativado")
		// }

		service.query(function(status){
			$scope.licenca = {"total": status[0], "consumida": status[1]};
			$scope.licencaUsadas = parseFloat((100 * status[1]) / status[0]).toFixed(2);
			$scope.licensaRestantes = parseFloat(100 - (((100 * status[1]) / status[0]))).toFixed(2);
			$location.path('/licenca');
			$scope.hide();
		},function(error){
			console.log(error);
			$location.path('/error');
			$scope.hide();
		});
	}

	$scope.hide = function(){
    	$ionicLoading.hide().then(function(){
    	$scope.$broadcast('scroll.refreshComplete');
        // console.log("The loading indicator is now hidden");
  	  });
  	};

  	$scope.isAtivo = function(){
  		return $localStorage.ativo;
  	}

	document.addEventListener('deviceready', function () {
		
    // Android customization
    cordova.plugins.backgroundMode.setDefaults({ 
    	title:  'Rodando em segundo',
    	text:'Doing heavy tasks.'});

	    if($scope.isAtivo()){
			// Enable background mode
			cordova.plugins.backgroundMode.enable();

	    }else{
	    	// disable background mode
	    	cordova.plugins.backgroundMode.disable();
	    }


		// Called when background mode has been activated
		cordova.plugins.backgroundMode.onactivate = function () {
		cordova.plugins.backgroundMode.configure({
			                text:'Rodando em segundo plano for more than 5s now.'
		});
		setTimeout(function () {
		// Modify the currently displayed notification



		 }, 5000);
		}
	}, false);

	$scope.add = function() {
        var alarmTime = new Date();
        alarmTime.setMinutes(alarmTime.getMinutes() + 1);
        $cordovaLocalNotification.add({
            id: "1234",
            date: alarmTime,
            message: "This is a message",
            title: "This is a title",
            autoCancel: true,
            sound: null
        }).then(function () {
            console.log("The notification has been set");
        });
    };

    //https://devdactic.com/local-notifications-ionic/
    $scope.isScheduled = function() {
        $cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
            alert("Notification 1234 Scheduled: " + isScheduled);
        });
    }

	$scope.atualizaStatus();
}]);