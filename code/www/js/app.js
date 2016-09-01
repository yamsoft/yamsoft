angular.module('songhop', ['ionic', 'ionic.closePopup', 'songhop.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
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
    $rootScope.$watch(function() {
        return $location.path();
    },
    function(a){
        if($rootScope.adishVar) {
            $rootScope.adishVar.pause();
        }
    });
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

    .state('app.bmi', {
      url: "/bmi",
      views: {
        'menuContent' :{
          templateUrl: "templates/bmi.html",
          controller: 'BmiCtrl'
        }
      }
    })

    .state('app.sleepWell', {
      url: "/sleepWell",
      views: {
        'menuContent' :{
          templateUrl: "templates/sleepWell.html",
          controller: 'sleepWellCtrl'
        }
      }
    })

    .state('app.history', {
      url: "/history",
      views: {
        'menuContent' :{
          templateUrl: "templates/history.html",
          controller: 'HistoryCtrl'
        }
      }
    })

    .state('app.terms', {
      url: "/terms",
      views: {
        'menuContent' :{
          templateUrl: "templates/terms.html",
          controller: 'termsCtrl'
        }
      }
    })

    .state('app.privacy', {
      url: "/privacy",
      views: {
        'menuContent' :{
          templateUrl: "templates/privacy.html",
          controller: 'privacyCtrl'
        }
      }
    })

    .state('app.articles', {
      url: "/articles",
      views: {
        'menuContent' :{
          templateUrl: "templates/articles.html",
          controller: 'articlesCtrl'
        }
      }
    })
    .state('app.articles:id', {
      url: "/articles:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/articlesIndividual.html",
          controller: 'articlesIndividualCtrl'
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
  $urlRouterProvider.otherwise('/app/discover');
})

.constant('SERVER', {
    url: 'https://ionic-songhop.herokuapp.com'
});
