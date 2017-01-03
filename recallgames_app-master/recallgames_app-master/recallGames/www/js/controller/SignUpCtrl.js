angular.module('SignUpCtrl', [])

/* _____________________ SIGN_UP CTRL ____________________ */
.controller('SignUpCtrl', function($scope, $state, $ionicLoading, $compile,Users) {
  // INIT VAR
  $scope.newUserInfo = {};

  /**
  ** Function used when the user wants to sign Up 
  **/
  $scope.signUp = function(){

    // CREATE A NEW USER
  	var newUser = {
  		"username": $scope.newUserInfo.username,
  		"pwd": $scope.newUserInfo.password,
      "savedGames": []
  	}

    // GET ALL USER
    var allUsers = Users.all();

    // CHECK IF THERE ARE AT LEAST ONE USER
    if(allUsers !== null){

      // GO THROUGHT ALL USER AND CHECK IF THE USERNAME IS NOT ALREADY TAKEN
      for(var i=0; i<allUsers.length;i++){
        if ($scope.newUserInfo.username == allUsers[i].username){
          document.getElementById("SignUpError").style.display = 'block';        
          return;
        }
      }
    }

    // ADD THE USER
  	Users.add(newUser);

    // GO TO LOGIN PAGE
    $state.go("tab.login");
  	
    //alert($scope.newUserInfo.firstName + "   " + $scope.newUserInfo.lastName + "   " + $scope.newUserInfo.dOB);
    //alert($scope.newUserInfo.mail + "   " + $scope.newUserInfo.phoneNumber);
    //alert($scope.newUserInfo.streetNumber + "   " + $scope.newUserInfo.streetName + "   " + $scope.newUserInfo.city + "   " + $scope.newUserInfo.county);

  }
});