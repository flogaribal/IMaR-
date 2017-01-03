angular.module('TabsCtrl', [])


/* _____________________ TABS CTRL ____________________ */
.controller('TabsCtrl', function($scope,$ionicModal, $ionicPopover, $timeout,$state, Games, Users) {
         // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////


    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

    /*
        FUNCTION TO CHECK IF USER IS CONNECTED
    */
    $scope.connected=function(){
        
        if (Users.getConnected()!=null){
           
            $state.go('tab.profile');   //if user is logged in

        }else{

            $state.go('tab.login');     //if user is not logged in
        }

    }

    /**
    ** Function used to pick another random game
    **/
    $scope.randomGame = function(){
        
            // get random game id
            //var randomNumber = Math.floor((Math.random())*(Games.all().length+1));

            do{
                var randomNumber = Math.floor((Math.random())*(Games.all().length + 1));      // GET ONE RANDOM NUMBER BETWEEN 0 AND NUMBER OF GAMES + 1 AND ROUND IT
                $scope.currGame = Games.get(randomNumber); // TEST IF A GAME WITH randomNumber AS id EXISTS
            }while($scope.currGame == null);

            //switch to game view
            $state.go('tab.random', {id: randomNumber}); 
            
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