angular.module('songhop', ['ionic', 'firebase' ,'ionic.service.core', 'ionic.closePopup', 'songhop.controllers', 'ngCordova', 'ionic-timepicker', 'ionic-datepicker'])

.run(function($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function() {
        // if (typeof analytics !== "undefined") {
        //     analytics.startTrackerWithId("UA-85625559-1");
        // } else {
        // }
        // var push = new Ionic.Push();
        //
        // push.register(function(token) {
        //     $rootScope.aa = token._token;
        //     push.saveToken(token);  // persist the token in the Ionic Platform
        // });
    });
})
.run( function($rootScope, $location, $ionicPlatform, $cordovaSQLite) {
    $rootScope.$watch(function() {
        return $location.path();
    },
    function(a){
        if(a=="/app/sleepWell"){
            setTimeout(function() {
            var currentArray3= document.getElementById("gnButton").className.split(" ");
            var resultClassString3 = "";
            for(var i=0; i<currentArray3.length; i++) {
                if(currentArray3[i]=="ion-ios-pause") {
                    currentArray3[i]= "ion-ios-play";
                }
                resultClassString3 = resultClassString3 + " " + currentArray3[i];
            }
            document.getElementById("gnButton").className = resultClassString3;
            document.getElementById("range-val").value = 0;
        },500);
        }
        if($rootScope.adishVar) {
            $rootScope.adishVar.pause();
            $rootScope.adishVar = undefined;
            clearInterval($rootScope.intervalValue);
        }
    });
        db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS BMI_HISTORY (id unique, dateValue, uName, result)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS DIABETES_HISTORY (id unique, dateValue, uName, result)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS REMINDER (id unique, dateValue, title, message)');
        });
})
.config(function (ionicTimePickerProvider) {
var timePickerObj = {
  inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
  format: 24,
  step: 5,
  setLabel: 'Set',
  closeLabel: 'Close'
};
ionicTimePickerProvider.configTimePicker(timePickerObj);
})

.config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      titleLabel: 'Select a Date',
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
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

    .state('app.reminder', {
      url: "/reminder",
      views: {
        'menuContent' :{
          templateUrl: "templates/reminder.html",
          controller: 'reminderCtrl'
        }
      }
    })

    .state('app.reminderList', {
      url: "/reminderList",
      views: {
        'menuContent' :{
          templateUrl: "templates/reminderList.html",
          controller: 'reminderListCtrl'
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
  $urlRouterProvider.otherwise('/app/articles');
})

.constant('SERVER', {
    url: 'https://ionic-songhop.herokuapp.com'
});
