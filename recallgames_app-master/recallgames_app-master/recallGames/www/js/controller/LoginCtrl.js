angular.module('LoginCtrl', [])

/* _____________________ LOGIN CTRL ____________________ */
.controller('LoginCtrl', function($scope,$rootScope,$location, $window, $timeout,$cordovaFile,Users,$state, $http, CONFIG) {
	$scope.errorDisplay=false; //errors

	$scope.isIOS = ionic.Platform.isIOS();

	// IF ONE USER IS ALREADY CONNECTED -> GO TO THE PROFILE PAGE
	if(Users.getConnected() !== null){
		$state.go("tab.profile");
	}

	// INIT LOGIN DATA
	$scope.loginData = {};

    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionic.material.ink.displayEffect();


    /**
	** Function used to Log in
	**/
	$scope.doLogin = function() {

		//IF DEVICE NOT CONNECTED TO INTERNET
		if(!$rootScope.connectedToInternet){

				alert("No Internet Connection! \nPlease Connect To Internet \nTo Login.");

		    	
		    }else{
		    	$http.get("http://"+CONFIG.domain+"/api/validate_user",{ 
					headers: { 
	   			 		"authorization": "Basic "+btoa($scope.loginData.username+":"+$scope.loginData.password)
   		      		}
		 			}).success(function(data) {

						if(data["error"] == false){ // CASE NO EROR
							Users.setConnected($scope.loginData);
							$state.go("tab.profile");
						}else{ 		// CASE ERROR
							
							 $scope.errorDisplay=true;
							 $scope.loginData.password="";

							//Set a timeout to clear error
								$timeout(function () {
								   $scope.errorDisplay=false;
								
								
								 }, 5000

								 ); //end of timeout

						}

	   		  	
				}); // END OF HTTP REQUEST				
		    	
		    }







		/*var userAsked = null;
		// If username field are not empty
		if($scope.loginData.username !== null || $scope.loginData.username !== ""){
			var userAsked = Users.get($scope.loginData.username);		// Try to get one use with the given username
		}

		if (userAsked == null){									// If none user was found -> display error 
			document.getElementById("UsernameConnexionError").style.display = 'block';   
			document.getElementById("PasswordConnexionError").style.display = 'none';        			     			
		}else if(userAsked.pwd == $scope.loginData.pwd){		// If password is good -> set Connected & go profile page
			document.getElementById("UsernameConnexionError").style.display = 'none';        			
			document.getElementById("PasswordConnexionError").style.display = 'none';        						
			//alert("Gégé");
			$state.go("tab.profile");
			Users.setConnected(userAsked);
		}else{													// If password is not the right -> display error 
			document.getElementById("PasswordConnexionError").style.display = 'block';        
			document.getElementById("UsernameConnexionError").style.display = 'none';        			
		}*/

    }//End of DOLOGIN


    /**
	** Function used to move to ForgotPassword page 
	**/
    $scope.forgotPassword= function(){
    	var forgotPage="http://"+CONFIG.domain+"/user/forgot";
    	// $location.url(signUpPage);
    	$window.open(forgotPage,'_system');
    	
    }

    /**
	** Function used to move to signUp page 
	**/
    $scope.signUp= function(){
    	var signUpPage="http://"+CONFIG.domain+"/user/create";
    	$window.open(signUpPage,'_system');
    	// $location.url(signUpPage);
    	
    }



});
