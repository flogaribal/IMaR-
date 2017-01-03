angular.module('HomeCtrl', [])
.controller('HomeCtrl', function($scope,$rootScope,$cordovaNetwork, Games, $state, Users) {

	if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
		ionic.Platform.ready(function(){
		  	// IF DEVICE NOT CONNECTED TO THE INTERNET
		    if($cordovaNetwork.isOffline()){
		    	alert("No Internet Connection! \nGames Collection May Not Be \nUp-To-Date.");
		    	$rootScope.connectedToInternet = false;
		    }else{
		    	$rootScope.connectedToInternet = true;
		    }
		});
	} else {
	  	$rootScope.connectedToInternet = true;
	}

	/**
	** Function used to pick another random game
	**/
	$scope.randomGame = function(){
		
			// get random game id
			//var randomNumber = Math.floor((Math.random())*(Games.all().length+1));

			do{
				var randomNumber = Math.floor((Math.random())*(Games.all().length+1));		// GET ONE RANDOM NUMBER BETWEEN 0 AND NUMBER OF GAMES + 1 AND ROUND IT
			 	$scope.currGame = Games.get(randomNumber+""); // TEST IF A GAME WITH randomNumber AS id EXISTS
			}while($scope.currGame == null);

			//switch to game view
			$state.go('tab.random', {id: randomNumber}); 
			
	}

	$scope.connected=function(){
		if (Users.getConnected()!=null){

			$state.go('tab.profile');
		}else{

			$state.go('tab.login');
		}

	}

	/*Function called when BUTTON OR TAB "COLLECTION" is clicked */
	$scope.collectionGames=function(){

		$state.go('tab.collection');
	}

	 /*Function called when BUTTON OR TAB "MAP" is clicked */
    $scope.mapGames=function(){

        $state.go('tab.map');
    }

});

