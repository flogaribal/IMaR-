// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    //controller : "loginCtrl"
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })


  .state('signUp', {
    url: "/signUp",
    templateUrl: "templates/signUp.html",
    controller: 'NewRequestCtrl'
  })


  .state('app.newRequest', {
    url: "/newRequest",
    views: {
      'menuContent': {
        templateUrl: "templates/newRequest.html",
        controller: 'NewRequestCtrl'
      }
    }
  })

  .state('app.pendingRequests', {
    url: "/pendingRequests",
    views: {
      'menuContent': {
        templateUrl: "templates/pendingRequests.html",
        controller: 'PendingRequestCtrl'
      }
    }
  })

  .state('app.previousCollections', {
    url: "/previousCollections",
    views: {
      'menuContent': {
        templateUrl: "templates/previousCollections.html",
        controller: 'PreviousCollectionsCtrl'
      }
    }
  })

  .state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "templates/settings.html"
      }
    }
  })
    
  .state('app.about', {
    url: "/about",
    views: {
      'menuContent': {
        templateUrl: "templates/about.html"
      }
    }
  })

  .state('app.conditions', {
    url: "/conditions",
    views: {
      'menuContent': {
        templateUrl: "templates/conditions.html"
      }
    }
  })

  .state('app.contact', {
    url: "/contact",
    views: {
      'menuContent': {
        templateUrl: "templates/contact.html"
      }
    }
  })

  .state('app.paymentMethods', {
    url: "/paymentMethods",
    views: {
      'menuContent': {
        templateUrl: "templates/paymentMethods.html"
      }
    }
  })

  .state('app.map', {
    url: "/map",
    views: {
      'menuContent': {
        templateUrl: "templates/map.html",
        controller: "MapCtrl"
      }
    }
  })


  .state('app.collections', {
    url: "/collections/:collectionsId",
    views: {
      'menuContent': {
        templateUrl: "templates/pendingRequests.html"
      }
    }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login'); 
});
