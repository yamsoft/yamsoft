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
    $rootScope.$watch(function() {
        return $location.path();
    },
    function(a){
        if($rootScope.adishVar) {
            $rootScope.adishVar.pause();
        }
        if(a.indexOf("discover")!=-1) {
            document.getElementById("tcID").style.display = "block";
            document.getElementById("feebackID").style.display = "block";
        }
        else {
            document.getElementById("tcID").style.display = "none";
            document.getElementById("feebackID").style.display = "none";
        }
    });
        db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS BMI_HISTORY (id unique, dateValue, result)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS DIABETES_HISTORY (id unique, dateValue, result)');
            // tx.executeSql('INSERT INTO BMI_HISTORY (id, result) VALUES (1, "foobar")');
            // tx.executeSql('INSERT INTO BMI_HISTORY (id, result) VALUES (2, "logmsg")');
            // tx.executeSql('INSERT INTO DIABETES_HISTORY (id, result) VALUES (1, "foobar2")');
            // tx.executeSql('INSERT INTO DIABETES_HISTORY (id, result) VALUES (2, "logmsg2")');
        });
})


.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router, which uses the concept of states.
    // Learn more here: https://github.com/angular-ui/ui-router.
    // Set up the various states in which the app can be.
    // Each state's controller can be found in controllers.js.
    $stateProvider


    // Set up an abstract state for the tabs directive:

    // Each tab has its own nav history stack:

    .state('discover', {
        url: '/discover',
        templateUrl: 'templates/discover.html',
        controller: 'DiscoverCtrl'
    })
    .state('terms', {
        url: '/terms',
        templateUrl: 'templates/terms.html',
        controller: 'termsCtrl'
    })
    .state('privacy', {
        url: '/privacy',
        templateUrl: 'templates/privacy.html',
        controller: 'privacyCtrl'
    })
    .state('favorites', {
        url: '/favorites',
        templateUrl: 'templates/favorites.html',
        controller: 'FavoritesCtrl'
    })
    .state('bmi', {
        url: '/bmi',
        templateUrl: 'templates/bmi.html',
        controller: 'BmiCtrl'
    })
    .state('history', {
        url: '/history',
        templateUrl: 'templates/history.html',
        controller: 'HistoryCtrl'
    })
    .state('sleepWell', {
        url: '/sleepWell',
        templateUrl: 'templates/sleepWell.html',
        controller: 'sleepWellCtrl'
    })
    // If none of the above states are matched, use this as the fallback:
    $urlRouterProvider.otherwise('/discover');

})


.constant('SERVER', {
    // Local server
    //url: 'http://localhost:3000'

    // Public Heroku server
    url: 'https://ionic-songhop.herokuapp.com'
});
