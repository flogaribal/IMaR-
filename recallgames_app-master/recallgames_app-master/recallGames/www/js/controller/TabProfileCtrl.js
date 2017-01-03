angular.module('TabProfileCtrl', [])


/* _____________________ TAB_PROFILE CTRL ____________________ */
.controller('TabProfileCtrl', function($rootScope,$scope,$timeout,$state, $http,Users,Games, CONFIG, $window) {
    
    
    $scope.showLogOut=false; //LOGOUT BUTTON HIDDEN AT INITIAL




    // Try to get connected User
    var connectedUser = Users.getConnected();
    if(connectedUser !== null && connectedUser !== undefined){      // If connectedUser exists
        // Get username from local storage
        $scope.username = connectedUser.username;
        

        // Get password from local storage
        $scope.password = connectedUser.password;

        $http.get("http://"+CONFIG.domain+"/api/gameBoxes",{ 
            headers: { 
                    "authorization": "Basic "+btoa($scope.username+":"+$scope.password)
                }
            }).success(function(data) {
            $scope.gamesBoxes = data.gamesBoxes;
        });

    }else{
        $state.go("tab.login");
    }

    /**
    ** Function used to get a random color
    **/
    var getRandomColor = function(){
        //           YELLOW,     BLUE,     RED,      ORANGE,  GREEN,        
        var color = ['#fccf3c','#2166ae','#bf1e2b','#ef7a1f','#2baf2b'];
        var randomNumber = Math.floor((Math.random())*6);
        return color[randomNumber];
    }


    /**
    ** Function used when the user wants to go to his saved games
    **/
    $scope.goMyGames = function(){
        //SHOW GAMES CONTENT AND HIDE LOGOUT SETTINGS CONTENT
        $scope.showLogOut=false;
        document.getElementById("myGamesTab").style.color = '#008000'; 
        document.getElementById("myGamesTab").style.textDecoration = "underline overline";
        document.getElementById("settingsTab").style.color = '#000000'; 
        document.getElementById("settingsTab").style.textDecoration = "none";
    }


    /**
    ** Function used when the user wants to go to settings
    **/
    $scope.goSettings = function(){
        //HIDE GAMES CONTENT AND SHOW LOGOUT SETTINGS CONTENT
        $scope.showLogOut=true;
        document.getElementById("myGamesTab").style.color = '#000000'; 
        document.getElementById("myGamesTab").style.textDecoration = "none";
        document.getElementById("settingsTab").style.color = '#008000';
        document.getElementById("settingsTab").style.textDecoration = "underline overline"; 
    }   
    

    /**
    ** Function used when the user wants to log Out
    **/
    $scope.logOut = function(){
        $state.go("tab.login");
        Users.setConnected(null);
    }


    /**
    ** Function used when the user click on one saved games
    **/
    $scope.moveOnDetail = function($id){
        $state.go("tab.profile-game-detail", {previousPage: 'tab.profile', id: $id});        
    }

    /*__________FUNCTION TO RE-DIRECT USER TO MANAGE GAME BOX________________*/
    $scope. manageGames= function(){
        var manageGames="http://"+CONFIG.domain+"/my/gamebox";
        $window.open(manageGames,'_system');
        // $location.url(signUpPage);
        
    }

});

