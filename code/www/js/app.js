// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// angular.module('songhop', ['ionic', 'ngCordova', 'songhop.controllers'])
angular.module('songhop', ['ionic', 'songhop.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
.run( function($rootScope, $location, $ionicPlatform, $cordovaSQLite) {
    $rootScope.alertOnce = 0;
        db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS BMI_HISTORY (id unique, dateValue, uName, result)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS DIABETES_HISTORY (id unique, dateValue, uName, result)');
        });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.discover', {
      url: "/discover",
      views: {
        'menuContent' :{
          templateUrl: "templates/discover.html",
          controller: 'DiscoverCtrl'
        }
      }
    })

    .state('app.favorites', {
      url: "/favorites",
      views: {
        'menuContent' :{
          templateUrl: "templates/favorites.html",
          controller: 'FavoritesCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/discover');
})

.constant('SERVER', {
    // Local server
    //url: 'http://localhost:3000'

    // Public Heroku server
    url: 'https://ionic-songhop.herokuapp.com'
});
