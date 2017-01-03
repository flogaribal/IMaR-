angular.module('GameDetailCtrl', [])

/* _____________________ GAME_DETAIL CTRL ____________________ */
.controller('GameDetailCtrl', function($scope,$state,$location,$http, $sce, $stateParams,$rootScope, $filter,$window, Games,Users, CONFIG) {

	// INIT VAR
	$scope.id = $stateParams.id; 			// ID GIVEN BY URL PARAM
	$scope.currGame;// CURRGAMES	
	$scope.state = $state.current.name;		// CURRPAGE  NAME
	$scope.titleExists=false;				//title of the game
	$scope.gameBoxId=$stateParams.gameBoxId;	//GAME BOX ID

	//GAME BOX DETAILS
	$scope.displayGameBox=true; 			//game box is displayed in default
	$scope.displayBasics=false;				//Basic details of the game is not shown at initial.
	$scope.displayHowToPlay=false;			//How To pLay details of the game is not shown at initial.
	$scope.displayBackground=false;			//Background details of the game is not shown at initial.
	$scope.displayPicsVideos=false;			//Pictures and Video details of the game is not shown at initial.
	$scope.displayGameCard=false;			//Game Card of the game is not shown at initial.

	//GAME CARD
	$scope.displayError=false;				//Display Error Message if Image Card Is not found
	$scope.displayImgCard=false;			//Display Game Image Card if found
	
	//SHARING OPTIONS
	$scope.displaySocialShare=false;		//show Social Share when Share Button is Clicked
	$scope.displayShareIcon=true;			//show share icon at intial load
	$scope.shareURL='http://' + CONFIG.domain +"/games/" + $scope.id; //share link for game
	
	//PICTURES AND VIDEOS
	$scope.hasYTvideo=false;					//if Thumbnail exists for link(Thumbnail for youtube)
	$scope.videoURL="";							//video URL for Pictures and Videos Game Details in MODAL
	$scope.domain = 'http://' + CONFIG.domain;	//DOMAIN link for image

	//GAME CARD
	$scope.gameCard_TNail_URL="";						//Assign Game Card Thumbnail URL

	
	  	
	//CHECK IF GAME IS INITIALIZED
	if($scope.id!=null || $scope.id!=undefined){
		
		//if id is not null, it must have title
		$scope.titleExists=true;
		$scope.currGame=Games.get($scope.id); //assign title of Game

		$scope.skills=$scope.currGame.skills; //assign skills category of the game
	
		//IF THERE IS NO PREVIOUS PAGE THEN DONT SHOW BACK ARROW
		if(!$stateParams.previousPage){
			$scope.noArrow = true;
		}


	/**
	** Function to GO BACK to previous page (either be Map, Collection)
	**/
	$scope.goBack = function(){

		if($stateParams.previousPage == 'tab.collection-map'){		// IF PREVIOUS PAGE IS MAP COLLECTION -> SEND BACK THE COUNTRY ID
			$state.go($stateParams.previousPage,{countryId: $scope.currGame.country_id, mapMode: true});

		}else if($stateParams.previousPage == 'tab.profile-game-collection'){		
			// IF PREVIOUS PAGE IS PROFILE PAGE -> SEND BACK THE GAME BOX ID
			$state.go($stateParams.previousPage,{gameBoxId: $scope.gameBoxId});
			

		}else{		// ELSE -> GO TO PREVIOUS PAGE WHICH WAS GIVEN BY URL PARAM
			$state.go($stateParams.previousPage);
		}
	}

	/**
	** Function used when the user wants to go back to game detail home
	**/
	$scope.goHomeGame = function(){
		$scope.displayGameBox=true; //display all game categories
		
		//do not display any of the details of the game
		$scope.displayBasics=false;
		$scope.displayHowToPlay=false;
		$scope.displayAccess=false;
		$scope.displayBackground=false;			
		$scope.displayPicsVideos=false;			
		$scope.displayGameCard=false;

		//set the category title empty
		$scope.html = '';
		$scope.trustedHtml = $sce.trustAsHtml($scope.html);
		
	}


	/*
	*Function to show Basics
	*/

	$scope.showBasics=function(){

		$scope.displayGameBox=false; //dont show game box
		$scope.displayBasics=true; //display basic details of the game

		//set category title as Basics
		$scope.html = 'Basics';
		$scope.trustedHtml = $sce.trustAsHtml($scope.html);
		
	}

	/*
	*Function to show How TO Play
	*/

	$scope.showHowToPlay=function(){
		$scope.displayGameBox=false; //dont show game box
		$scope.displayHowToPlay=true; //display How to play details of the game

		//set the category title as How To Play
		$scope.html = 'How To Play';
		$scope.trustedHtml = $sce.trustAsHtml($scope.html);
	}

	/*
	*Function to show Universal Access
	*/

	$scope.showUniversalAccess=function(){
		$scope.displayGameBox=false; //dont show game box
		$scope.displayAccess=true; //display How to play details of the game

		//set the category title as UNIVERSAL ACCESS
		$scope.html = 'Universal Access';
		$scope.trustedHtml = $sce.trustAsHtml($scope.html);
	
}
	/*
	*Function to show Background
	*/

	$scope.showBackground=function(){
		$scope.displayGameBox=false; //dont show game box
		$scope.displayBackground=true; //display How to play details of the game

		//set the category title as BACKGROUND
		$scope.html = 'Background';
		$scope.trustedHtml = $sce.trustAsHtml($scope.html);
	}

	/*
	*Function to show Pictures and Movies of the game
	*/

	$scope.showPicturesMovies=function(){
		$scope.displayGameBox=false; //dont show game box
		$scope.displayPicsVideos=true; //display How to play details of the game
		
		//set the category title as PICTURES AND VIDEOS
		$scope.html = 'Pictures & Videos';
		$scope.trustedHtml = $sce.trustAsHtml($scope.html);

		//set the video for the game
		var videoPath=$scope.currGame.video;
		

		if(videoPath!=null || videoPath!=''){
			
			//CHECK IF URL PATH IS YOUTUBE EMBED-ABLE
			if(!isYoutube(videoPath)){
				$scope.videoURL=videoPath;
				$scope.hasYTvideo=false;

			}else{
				$scope.hasYTvideo=true;
				$scope.videoURL=$sce.trustAsResourceUrl("http://www.youtube.com/embed/"+getId(videoPath));
				
			}	
			

		}
	}//end of show pictures and movies method


	//QUERY IF VIDEO IS YOUTUBE OR NOT
   var isYoutube = function(url){

	var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	var match = url.match(regExp);
	if (match && match[2].length == 11) {
		return true;
	} else {
		//error
		return false;
	}

   };

   //CREATE THUMBNAIL OUT OF YOUTUBE VIDEOS
	// var getThumb = function (url, size) {
 //        if (url === null) {
 //            return '';
 //        }
 //        size    = (size === null) ? 'big' : size;
        
 //        var id = getId(url);
 
 //        if (size === 'small') {
 //            return 'http://img.youtube.com/vi/' + id + '/2.jpg';
 //        }
 //        //return 'http://img.youtube.com/vi/' + id + '/0.jpg';
 //        return 'http://img.youtube.com/vi/' + id + '/hqdefault.jpg'; //HQ default
 //    };
    
    
	//GET ID OF THE YOUTUBE VIDEO
	var getId = function(url){

			var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
			var match = url.match(regExp);
			if (match && match[2].length == 11) {
				return match[2];
			} else {
				//error
			}

	};

	/*
	*Function to show Game CARD
	*/

	$scope.showGameCard=function(){
		$scope.displayGameBox=false; //dont show game box
		$scope.displayGameCard=true; //display How to play details of the game

		//set the category title as How To Play
		$scope.html = 'Game Card';
		$scope.trustedHtml = $sce.trustAsHtml($scope.html);
		
		//CHECK IF CURRENT GAME HAS GAME CARD
		if($scope.currGame.card!=""){
			
			$scope.displayImgCard=true;
			$scope.gameCard_TNail_URL='http://' + CONFIG.domain+"/games/"+$scope.currGame.id+"/card-thumbnail";
		}else{
				
        		$scope.displayError=true;
        		$scope.displayImgCard=false;

		}


		
	}//end of show game card



		/**
	** Function used when the user click on the game card link to download gamecard as PDF
	**/
	$scope.downloadPDF = function(){
		window.open('http://' + CONFIG.domain+'/content/cards/'+$scope.currGame.card, '_system');
	}

	/*
		Function to show and hide social share links (Facebook, Twitter, GooglePlus)
	*/
	$scope.showSocial=function(){

		$scope.displaySocialShare=true;
		$scope.displayShareIcon=false;
	}

	$scope.hideSocial=function(){
		$scope.displaySocialShare=false;
		$scope.displayShareIcon=true;
		
	}



	//case where there is no scope id assigned
	}else{
		console.log("scope ID: "+ $scope.id);
	}

})
