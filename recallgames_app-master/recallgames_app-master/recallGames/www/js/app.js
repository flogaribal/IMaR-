// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'leaflet-directive', 'ngCordova', 'HomeCtrl','TabsCtrl','CollectionCtrl','MapCtrl','LoginCtrl','TabProfileCtrl','OtherCtrl','GameDetailCtrl','SignUpCtrl','services','directive','youtube-embed', 'config'])

.run(function($ionicPlatform, $cordovaSplashscreen) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      //StatusBar.styleLightContent();
        StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('home', {
    url: "/home",
    templateUrl:"templates/home.html",
    controller: 'HomeCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html",
    controller: 'TabsCtrl'
  })


       .state('tab.collection', {
          url: '/collection',
          views: {
            'tab-collection': {
              templateUrl: 'templates/tab-collection.html',
              controller: 'CollectionCtrl'
            }
          }
        })

                  .state('tab.collection-game-detail', {
                    url: '/collection/game?previousPage&id',
                    views: {
                      'tab-collection': {
                        templateUrl: 'templates/game-detail.html',
                        controller: 'GameDetailCtrl'
                      }
                    }
                  })

        .state('tab.map', {
            url: '/map',
            views: {
              'tab-map': {
                templateUrl: 'templates/tab-map.html',
                controller: 'MapController'
              }
            }
          })

                  .state('tab.collection-map', {
                      url: '/map/collection?countryId&mapMode',
                      views: {
                        'tab-map': {
                          templateUrl: 'templates/tab-collection.html',
                          controller: 'CollectionCtrl'
                        }
                      }
                    })

                  .state('tab.game-detail-map', {
                      url: '/map/collection/game?previousPage&countryId&id',
                      views: {
                        'tab-map': {
                          templateUrl: 'templates/game-detail.html',
                          controller: 'GameDetailCtrl'
                        }
                      }
                    })  

        .state('tab.random', {
          cache: false,
          url: '/random?id',
          views: {
            'tab-random': {
              templateUrl: 'templates/game-detail.html',
              controller: 'GameDetailCtrl'
            }
          }
        })


        .state('tab.login', {
          url: '/login',
          views: {
            'tab-login': {
              templateUrl: 'templates/tab-login.html',
              controller: "LoginCtrl"
            }
          }
        })
                .state('tab.signUp', {
                  url: '/signUp',
                  views: {
                    'tab-login': {
                      templateUrl: 'templates/signUp.html',
                      controller : "SignUpCtrl"
                    }
                  }
                })


                .state('tab.profile', {
                  url: '/profile',
                  views: {
                    'tab-login': {
                      templateUrl: 'templates/tab-profile.html',
                      controller: "TabProfileCtrl"
                    }
                  }
                })

                

                .state('tab.profile-game-collection', {
                  url: '/profile/gameBox?gameBoxId',
                  views: {
                    'tab-login': {
                      templateUrl: 'templates/tab-collection.html',
                      controller: 'CollectionCtrl'
                    }
                  }
                })


                .state('tab.profile-game-detail', {
                  url: '/profile/gamesId?previousPage&gameBoxId&id',
                  views: {
                    'tab-login': {
                      templateUrl: 'templates/game-detail.html',
                      controller: 'GameDetailCtrl'
                    }
                  }
                }) 

        .state('tab.other', {
          url: '/other',
          views: {
            'tab-other': {
              templateUrl: 'templates/tab-other.html',
              controller: 'OtherCtrl'
            }
          }
        });

  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

  $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
  $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS

});
