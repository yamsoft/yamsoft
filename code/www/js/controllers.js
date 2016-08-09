angular.module('songhop.controllers', ['ionic', 'songhop.services'])


/*
Controller for the discover page
*/
.controller('DiscoverCtrl', function($scope, $location) {
    $scope.nextPage = function() {
        $location.path('tab/favorites');
    };
})


/*
Controller for the favorites page
*/
.controller('FavoritesCtrl', function($scope, $ionicPopup) {
    $scope.ageArr = [];
    $scope.displayProgress = false;
    $scope.scored = false;
    for(var i=0; i<=70; i++) {
      $scope.ageArr.push(i+20);
    }
    $scope.wtArr = [];
    for(var i=54; i<=149; i++) {
      $scope.wtArr.push(i);
    }

    $scope.calculateDiabities = function(age, gender, ges, fam, bp, fit, ht, weight, ev) {
      $scope.displayProgress = true;
        var score = 0;
        var myWt = weight/0.454;
        if(age) {
          if(age<40) {
            //do nothing
          }
          else  if(age>=40 && age <50) {
            score = score+1;
          }
          else  if(age>=50 && age <60) {
            score = score+2;
          }
          else  if(age>=60) {
            score = score+3;
          }
        }
        if(gender) {
          if(gender=="true") {
            //Male case
            score = score+1;
          }
          else {
            if(ges=="true") {
              score = score+1;
            }
          }
        }
        if(fam=="true") {
          score = score+1;
        }
        if(bp=="true") {
          score = score+1;
        }
        if(fit=="false") {
          score = score+1;
        }
        if(ht && myWt) {
          //case1 top
          if(ht === 0) {
            if(myWt>=119 && myWt<=142) {
              score = score+1;
            }
            else if(myWt>=143 && myWt<=190) {
              score = score+2;
            }
            else  if(myWt>=191) {
              score = score+3;
            }
          }
          if(ht === 1) {
            if(myWt>=124 && myWt<=147) {
              score = score+1;
            }
            else if(myWt>=148 && myWt<=197) {
              score = score+2;
            }
            else  if(myWt>=198) {
              score = score+3;
            }
          }
          if(ht === 2) {
            if(myWt>=128 && myWt<=152) {
              score = score+1;
            }
            else if(myWt>=153 && myWt<=203) {
              score = score+2;
            }
            else  if(myWt>=204) {
              score = score+3;
            }
          }
          if(ht === 3) {
            if(myWt>=132 && myWt<=157) {
              score = score+1;
            }
            else if(myWt>=158 && myWt<=210) {
              score = score+2;
            }
            else  if(myWt>=211) {
              score = score+3;
            }
          }
          if(ht === 4) {
            if(myWt>=136 && myWt<=163) {
              score = score+1;
            }
            else if(myWt>=164 && myWt<=217) {
              score = score+2;
            }
            else  if(myWt>=218) {
              score = score+3;
            }
          }
          if(ht === 5) {
            if(myWt>=141 && myWt<=168) {
              score = score+1;
            }
            else if(myWt>=169 && myWt<=224) {
              score = score+2;
            }
            else  if(myWt>=225) {
              score = score+3;
            }
          }
          if(ht === 6) {
            if(myWt>=145 && myWt<=173) {
              score = score+1;
            }
            else if(myWt>=174 && myWt<=231) {
              score = score+2;
            }
            else  if(myWt>=232) {
              score = score+3;
            }
          }
          if(ht === 7) {
            if(myWt>=150 && myWt<=179) {
              score = score+1;
            }
            else if(myWt>=180 && myWt<=239) {
              score = score+2;
            }
            else  if(myWt>=240) {
              score = score+3;
            }
          }
          if(ht === 8) {
            if(myWt>=155 && myWt<=185) {
              score = score+1;
            }
            else if(myWt>=186 && myWt<=246) {
              score = score+2;
            }
            else  if(myWt>=247) {
              score = score+3;
            }
          }
          if(ht === 9) {
            if(myWt>=159 && myWt<=190) {
              score = score+1;
            }
            else if(myWt>=191 && myWt<=254) {
              score = score+2;
            }
            else  if(myWt>=255) {
              score = score+3;
            }
          }
          if(ht === 10) {
            if(myWt>=164 && myWt<=196) {
              score = score+1;
            }
            else if(myWt>=197 && myWt<=261) {
              score = score+2;
            }
            else  if(myWt>=262) {
              score = score+3;
            }
          }
          if(ht === 11) {
            if(myWt>=169 && myWt<=202) {
              score = score+1;
            }
            else if(myWt>=203 && myWt<=269) {
              score = score+2;
            }
            else  if(myWt>=270) {
              score = score+3;
            }
          }
          if(ht === 12) {
            if(myWt>=174 && myWt<=208) {
              score = score+1;
            }
            else if(myWt>=209 && myWt<=277) {
              score = score+2;
            }
            else  if(myWt>=278) {
              score = score+3;
            }
          }
          if(ht === 13) {
            if(myWt>=179 && myWt<=214) {
              score = score+1;
            }
            else if(myWt>=215 && myWt<=285) {
              score = score+2;
            }
            else  if(myWt>=286) {
              score = score+3;
            }
          }
          if(ht === 14) {
            if(myWt>=184 && myWt<=220) {
              score = score+1;
            }
            else if(myWt>=221 && myWt<=293) {
              score = score+2;
            }
            else  if(myWt>=294) {
              score = score+3;
            }
          }
          if(ht === 15) {
            if(myWt>=189 && myWt<=226) {
              score = score+1;
            }
            else if(myWt>=227 && myWt<=301) {
              score = score+2;
            }
            else  if(myWt>=302) {
              score = score+3;
            }
          }
          if(ht === 16) {
            if(myWt>=194 && myWt<=232) {
              score = score+1;
            }
            else if(myWt>=233 && myWt<=310) {
              score = score+2;
            }
            else  if(myWt>=311) {
              score = score+3;
            }
          }
          if(ht === 17) {
            if(myWt>=200 && myWt<=239) {
              score = score+1;
            }
            else if(myWt>=240 && myWt<=318) {
              score = score+2;
            }
            else  if(myWt>=319) {
              score = score+3;
            }
          }
          if(ht === 18) {
            if(myWt>=205 && myWt<=245) {
              score = score+1;
            }
            else if(myWt>=246 && myWt<=327) {
              score = score+2;
            }
            else  if(myWt>=328) {
              score = score+3;
            }
          }
        }
        var alertPopup = $ionicPopup.alert({
            title: 'AHOY!!!',
            template: 'Your risk score is ' + score
        });
    }

    $scope.htArr = [
      {
        disp: "4.10",
        val1: 0
      },
      {
        disp: "4.11",
        val1: 1
      },
      {
        disp: "5.0",
        val1: 2
      },
      {
        disp: "5.1",
        val1: 3
      },
      {
        disp: "5.2",
        val1: 4
      },
      {
        disp: "5.3",
        val1: 5
      },
      {
        disp: "5.4",
        val1: 6
      },
      {
        disp: "5.5",
        val1: 7
      },
      {
        disp: "5.6",
        val1: 8
      },
      {
        disp: "5.7",
        val1: 9
      },
      {
        disp: "5.8",
        val1: 10
      },
      {
        disp: "5.9",
        val1: 11
      },
      {
        disp: "5.10",
        val1: 12
      },
      {
        disp: "5.11",
        val1: 13
      },
      {
        disp: "6.0",
        val1: 14
      },
      {
        disp: "6.1",
        val1: 15
      },
      {
        disp: "6.2",
        val1: 16
      },
      {
        disp: "6.3",
        val1: 17
      },
      {
        disp: "6.4",
        val1: 18
      }
    ];
    $scope.diabCheck = {
      age: 20,
      gender: "true",
      ges: "false",
      fam: "false",
      bp: "false",
      fit: "true",
      ht: 0,
      weight: 54
    }
})


/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope) {

});
