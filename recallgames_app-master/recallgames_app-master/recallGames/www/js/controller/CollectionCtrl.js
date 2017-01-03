angular.module('CollectionCtrl', [])


/* _____________________ COLLECTION CTRL ____________________ */
.controller('CollectionCtrl', function($scope, $state, $stateParams, $rootScope, $ionicLoading, $http, Games, CONFIG, $filter, Users) {


	// INIT THE SEARCH CONTENT
	$scope.search = {};
	$scope.state = $state.current.name;		// CURRPAGE  NAME
	$scope.countryId=null;					// INITIALIZATION/ ASSIGN COUNTRY ID LATER IF EXISTS
	$scope.gameBoxId=null;					// INITIALIZATION/ ASSIGN GAME BOX ID LATER IF EXISTS
	var onlyGames=[];						//To store only games from Gamebox


	//IF PARAMETERS COUNTRY ID ARE SENT FROM MAP PAGE
	if($stateParams.countryId!=null || $stateParams.countryId!=undefined){
		$scope.countryId=$stateParams.countryId;
	}

	// IF PARAMETERS GAME BOX ID ARE SENT FROM PROFILE PAGE
	if($stateParams.gameBoxId!=null || $stateParams.gameBoxId!=undefined){
		$scope.gameBoxId=$stateParams.gameBoxId;
	}	

/*____________________________________GENERATE RANDOM COLOR FOR GAMES____________________________*/
	var getRandomColor = function(){
		// 			 YELLOW,     BLUE,     RED,      ORANGE,  GREEN,  		
		var color = ['#fccf3c','#2166ae','#bf1e2b','#ef7a1f','#2baf2b'];
		//var color = ['#ffc900','#387ef5','#886aea','#ef473a','#11c1f3','#33cd5f','#bf1e2b'];
		var randomNumber = Math.floor((Math.random())*5);
		return color[randomNumber];
	}

/*____________________________________SET UP LOADING DISPLAY___________________________*/
	
	 var showLoader = function() {
    	$ionicLoading.show({
      	content: 'Loading',
      	animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 0

    	});
  	};
  	
  	var hideLoader = function(){
    	$ionicLoading.hide();
  		
  	};
	
	

/*_________________________________LOAD UPDATED GAMES WHEN ONLINE__________________________________________________________*/
	var loadGamesOnline = function(){
		 //SHOW LOADER  	
		showLoader();

		// UP TO DATE THE GAME LIST FROM THE ONLINE API
	 	$http.get('http://' + CONFIG.domain +'/api/games').success(function(data) {

	 		// SET RANDOM COLORS FOR EACH GAME
			  	angular.forEach(data, function(v, k){

			  		data[k]['color'] = getRandomColor();
			  		

			  	} );

	 		//CHECK IF THE PAGE IS REQUESTED USING COUNTRY ID
	 		if($scope.countryId!=null){
	 			//INITALLY EMPTY ALL GAMES IN LOCAL STORAGE
	 			$scope.games=[];
	 		
	 			//filter scope games by country id	 			
	 			$scope.games=$filter('filter')(data, {"country_id": $scope.countryId}, true); //true at end add strict comparision;

	 			//HIDE LOADER AFTER
				hideLoader();
	 			
			//CHECK ELSE IF IT IS REQUESTED USING GAME BOX ID
	 		}else if($scope.gameBoxId!=null){
	 			//INITALLY EMPTY ALL GAMES IN LOCAL STORAGE
	 			$scope.games=[];

	 			//CHECK IF USERS ARE CONNECTED
	 			var connectedUser = Users.getConnected();
    			if(connectedUser !== null && connectedUser !== undefined){      // If connectedUser exists
			        // Get username from local storage
			        $scope.username = connectedUser.username;		       

			        // Get password from local storage
			        $scope.password = connectedUser.password;

			        //INNER HTTP REQUEST TO GET GAME BOX DATA
		 			$http.get("http://"+CONFIG.domain+"/api/gameBox/"+$scope.gameBoxId,{ 
	            			headers: { 
	                    		"authorization": "Basic "+btoa($scope.username+":"+$scope.password)
	                		}
	            		}).success(function(gameData) {

	            			//push ONLY GAMES DATA FROM GAME BOX INFORMATION
		            		angular.forEach(gameData.games, function(v,k){

		                        onlyGames.push(v);
		                    });

	            		           		
		            	//GAME ID "game_id" SHOULD BE THE KEY "id" TO NAVIGATE TO GAME DETAILS
	            		angular.forEach(onlyGames, function(v,k){
	            			onlyGames[k]['id']=v['game_id'];

	            			//ALSO ADD COLOR SO THAT BOX HAS RANDOM COLOR
	            			onlyGames[k]['color'] = getRandomColor();
	            		}); 


	            		//games selected from game box
	            		$scope.games = onlyGames;  
	                    
	                    //HIDE LOADER AFTER
					 	hideLoader();
	        		}); //END OF INNER HTTP REQUEST
	            }

	 					
	 			
	 		//ELSE PAGE REQUESTED WITH NO PARAMETERS	 			
	 		}else{
	 			
	 			$scope.games = data;
				$rootScope.allGames = data;
	 			// WHEN ALL IS LOADED
	  			angular.element(document).ready(function () {
	  	   
					 	// STORE ALL GAMES IN LOCAL STORAGE
					 	Games.addAll($scope.games);
					 	//HIDE LOADER AFTER
					 	hideLoader();
				});	
			  	
	 		}// end of if and else
	 		
		  	
	 })//END OF HTTP REQUEST MADE FUNCTION
	
	

	}// END OF LOADGAMESONLINE


/*__________________________________LOAD OFFLINE GAMES DURING NO INTERNET CONNECTION_______________________________________________________________*/

	var loadGamesOffline = function(){
		//show LOADER AFTER
		showLoader();

		if(Games.all() !== null){
			// CASE COLLECTION FROM MAP PAGE
			if($stateParams.countryId == undefined && ($stateParams.mapMode == undefined || $stateParams.mapMode == false)){ 		// IF COUNTRY ID NOT DEFINED -> GET ALL GAMES FROM LOCAL STORAGE AND DISPLAY THEM
				$rootScope.allGames = Games.all();
			}else{									// IF COUNTRY ID DEFINED -> GET AND DISPLAY GAMES OF THIS COUNTRY ONLY 
				$rootScope.allGames = Games.all();
				$rootScope.allGames = Games.getByCountryId($stateParams.countryId);
			}

			// PUT GAMES TO DISPLAY IN THE SCOPE IN ORDER TO ACCES THEM FROM VIEWS
			$scope.games = $rootScope.allGames;
			
			//HIDE LOADER AFTER
 			hideLoader();
		}
	}//END OF LOADGAMESOFFLINE


/*_____________________________________********MAIN START HERE********** ___________________________________________________*/
	//check for internet connection to decide either show games saved or new update API of Games
	var  loadCollection=function(){
		if($rootScope.connectedToInternet){
			loadGamesOnline();
			
		}
		else{
			loadGamesOffline();
		}
	}

	loadCollection(); //CALL INITIAL FUNCTION




/*_____________________SCOPE FUNCTIONS_____________________*/
	$scope.clearSearch = function(){
		$scope.search.txt = '';
		loadGamesOffline();
	}

	//WHEN GAME BOX IS CLICKED
 	$scope.moveOnDetail = function($id){
 		if($stateParams.mapMode == "true"){
			$state.go("tab.game-detail-map", {previousPage: 'tab.collection-map', id: $id});

		}else if($scope.gameBoxId != undefined || $scope.gameBoxId != null){
			$state.go("tab.profile-game-detail", {previousPage: 'tab.profile-game-collection',gameBoxId : $scope.gameBoxId, id : $id}); 		

		}else{
			$state.go("tab.collection-game-detail", {previousPage: 'tab.collection', id : $id}); 		
		}
 	}


 	//NAVIGATE BACK TO PREVIOUS PAGE
 	$scope.goBack = function(){
 		if ($scope.state == 'tab.collection-map') {
	 		$state.go("tab.map");
 		}else if($scope.state == 'tab.profile-game-collection'){
 			$state.go("tab.profile");
 		}
 	}
 	


/*________________________FILTER BY SEARCH________________*/
 	$scope.myFilter = function(txt){
 		// ARRAY OF FILTERED GAMES
    	var filtered = [];
   		var letterMatch = new RegExp(txt, 'i');
		if($rootScope.allGames !== null && $rootScope.allGames !== undefined){
			// IF txt IS NOT EMPTY
	  		if (txt) {
		    	for (var i = 0; i < $rootScope.allGames.length; i++) {
		      		var item = $rootScope.allGames[i];
	        		//if (letterMatch.test(item.title.substring(0, txt.length))) {		// TEST IF title BEGIN WITH letterMatch
	        		if (letterMatch.test(item.title)) { 								// TEST IF title CONTAINS letterMatch

	        			//PUT ITEM IN ARRAY
			          	filtered.push(item);
			          	
		        	}
		        }//END OF FOR LOOP

		       //FILL COLLECTION WITH SEARCHED TEXT GAMES
		       $scope.games=filtered;

	        // IF txt IS EMPTY
	      	} else {
			      	if(($scope.countryId==null || $scope.countryId==undefined) && ($scope.gameBoxId==undefined || $scope.gameBoxId==null)){
			      		filtered=$rootScope.allGames;
			   			$scope.games = filtered;
		   		
		   			}// END OF INNER IF INSIDE ELSE
	      	}//END OF ELSE




	      }//END OF INITIAL IF STATEMENT
    	 
   		
   		
 	}//END OF FILTER



});// END OF CONTROLLER


