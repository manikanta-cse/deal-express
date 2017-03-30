// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'techHungers.controllers'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom');


    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html'
      })

      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html'
          }
        }
      })
      .state('app.vehicles', {
        url: '/vehicles',
        views: {
          'menuContent': {
            templateUrl: 'templates/vehicles.html',
            controller: 'VehicleCtrl'
          }
        }
      }).state('app.account', {
        url: '/account',
        views: {
          'menuContent': {
            templateUrl: 'templates/account.html'
          }
        }
      })

      .state('app.vehicleDetail', {
        url: '/vehicleDetail',
        views: {
          'menuContent': {
            templateUrl: 'templates/vehicleDetail.html',
            controller: 'VehicleDetailCtrl'
          }
        }
      })
    .state('app.store', {
      url: '/store',
      views: {
        'menuContent': {
          templateUrl: 'templates/store.html',
          controller:'storeCtrl'
        }
      }
    })
    .state('app.paymentStructure', {
        url: '/paymentStructure',
        views: {
          'menuContent': {
            templateUrl: 'templates/paymentStructure.html',
            controller:'paymentStructureCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
  });

angular.module('techHungers.controllers', ['techHungers.services']);
angular.module('techHungers.services', []);
