angular.module('starter.controllers', [])


/* ______________________ LOGIN CTRL ______________________*/
.controller('LoginCtrl', function($scope, $ionicModal, $timeout, $state) {
  $scope.loginData = {};
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    //alert($scope.loginData.username + "     " + $scope.loginData.password);
    if(($scope.loginData.username == null || $scope.loginData.username == "") && ($scope.loginData.password == null || $scope.loginData.password == "")){
      $state.transitionTo("app.pendingRequests");
    }else{
      document.getElementById("ConnexionError").style.display = 'block';        
    }
  };
})

/* ______________________ APP CTRL ______________________*/
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

/* ______________________ NEW_REQUEST CTRL ______________________*/

.controller('NewRequestCtrl', function($scope, $window, $ionicPlatform) {
  $scope.mine = { checked: true };

  $scope.showValue = function() {
      alert($scope.mine.checked);
  }

  $scope.showForm = function(){
      if($scope.mine.checked == true){
        document.getElementById("form").style.display = 'none';
      }else{
        document.getElementById("form").style.display = 'block';
      }
  }


  $scope.pushNotificationChange = function() {
      alert('Push Notification Change: '+ $scope.pushNotification.checked);
  };
  
  $scope.pushNotification = { checked: true };
  $scope.emailNotification = 'Subscribed';

  $scope.requestInfo = {};
  $scope.addRequest = function(){
    alert($scope.requestInfo.weight + "   " + $scope.requestInfo.pounds + "    "+ $scope.requestInfo.SELECT );
    alert($scope.requestInfo.date + "    "+ $scope.requestInfo.lowerTime + "    "+ $scope.requestInfo.upperTime);
  }
})

/* ______________________ PENDING_REQUESTS CTRL ______________________*/

.controller('PendingRequestCtrl', function($scope) {
  $scope.PendingRequests = [
      { text: 'Request 1', id: 1 },
      { text: 'Request 2', id: 2 }
  ];
})


/* ______________________ PREVIOUS_COLLECTION CTRL ______________________*/

.controller('PreviousCollectionsCtrl', function($scope) {
  $scope.PreviousCollections = [
      { text: 'Request 4', id: 4 },
      { text: 'Request 5', id: 5 }
  ];
})

/* ______________________ MAP CTRL ______________________*/

.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
    
});


