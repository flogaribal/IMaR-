angular.module('starter.controllers', [])



/* ______________________ APP CTRL ______________________*/
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    alert("TEST");
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
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


  $scope.unitList = [
        { text: "Kilogram", value: "kg" },
        { text: "Pound", value: "£" }
  ];
  $scope.pushNotificationChange = function() {
      alert('Push Notification Change: '+ $scope.pushNotification.checked);
  };
  
  $scope.pushNotification = { checked: true };
  $scope.emailNotification = 'Subscribed';
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


