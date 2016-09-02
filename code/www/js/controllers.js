angular.module('songhop.controllers', ['ionic', 'songhop.services'])


/*
Controller for the discover page
*/
.controller('AppCtrl', function($scope, $location, $ionicPopup, $cordovaSocialSharing, IonicClosePopupService) {
    $scope.nextDiabetes = function(event) {
        event.preventDefault();
        $location.path('app/favorites');
    };
    $scope.nextBMI = function(event) {
        event.preventDefault();
        $location.path('app/bmi');
    };
    $scope.nextSleepWell = function(event) {
        event.preventDefault();
        $location.path('app/sleepWell');
    };
    $scope.nextHistory = function(event) {
        event.preventDefault();
        $location.path('app/history');
    };
    $scope.nextArticles = function(event) {
        event.preventDefault();
        $location.path('app/articles');
    };
    $scope.tryOut = function() {
        event.preventDefault();
        alertPopup = $ionicPopup.alert({
            title: 'LEGAL',
            scope: $scope,
            template: '<h4 ng-click="privacyFunction()">Privacy Policy</h4><hr /><h4 ng-click="tcFunction()" style="padding-top:10px;">Terms of Service</h4>',
            buttons: [
            ]
        });
        IonicClosePopupService.register(alertPopup);
    }
    $scope.tcFunction = function() {
        alertPopup.close();
        $location.path("app/terms");
    }
    $scope.privacyFunction = function() {
        alertPopup.close();
        $location.path("app/privacy");
    }
    $scope.sendFeedback = function () {
        $cordovaSocialSharing
        .shareViaEmail('', 'sugarT application feedback', 'yamsoftcore@gmail.com');
    };
})
.controller('articlesCtrl', function($scope, $http, $location) {
    $scope.draggedStyle = function(event) {
        document.getElementById("divForDrag").style.transform = "translate(" + 0 + "px, " + parseInt(event.gesture.center.pageY)/4 + "px)";
    }
    $scope.releaseFunction = function(event) {
        document.getElementById("divForDrag").style.transform = "translate(" + 0 + "px, " + 0 + "px)";
        $scope.fetchArticles();
    }
    $scope.fetchArticles = function() {
        console.log("called");
        $scope.waiting = true;
        setTimeout(function(){ document.getElementById("gifDiv").style.display = "none"; },11000);
        var url = "https://healthfinder.gov/developer/MyHFSearch.json?api_key=dlsuoidgstljdgmb&who=someone&age=35&gender=female&pregnant=0";
        $http.get(url).success( function(response) {
            $scope.waiting = false;
            $scope.responseComplete = response.Result.Topics;
        });
    }
    $scope.fetchArticles();
    $scope.viewArticle = function(event) {
        $location.path('app/articles:' + event);
    }
})
.controller('articlesIndividualCtrl', function($scope, $http, $location) {
    $scope.waiting = true;
    var aa = $location.$$url.split(":")[1];
    setTimeout(function(){ document.getElementById("gifDiv").style.display = "none"; },11000);
    var url = "https://healthfinder.gov/developer/MyHFSearch.json?api_key=dlsuoidgstljdgmb&who=someone&age=35&gender=female&pregnant=0";
    $http.get(url).success( function(response) {
        $scope.waiting = false;
        for(var i=0; i<response.Result.Topics.length; i++) {
            if(response.Result.Topics[i].Id==aa) {
                $scope.responseIndividual = response.Result.Topics[i];
                break;
            }
        }
        setTimeout(function() {
            for(var j=0; j< $scope.responseIndividual.Sections.length; j++) {
                var div = document.createElement('div');
                div.className = 'ainveyi';
                div.innerHTML = $scope.responseIndividual.Sections[j].Content;
                var idValue = 'yes'+j;
                document.getElementById(idValue).appendChild(div);
            }
        },500);
    });
})
.controller('DiscoverCtrl', function($scope, $location) {
    var alertPopup;
    function networkInfo() {
        $location.path('app/sleepWell');
    }
    $scope.nextPage = function(event) {
        event.preventDefault();
        $location.path('app/favorites');
    };
    $scope.nextPageBmi = function(event) {
        event.preventDefault();
        $location.path('app/bmi');
    };
    $scope.nextHistory = function(event) {
        event.preventDefault();
        $location.path('app/history');
    };
    $scope.nextPageSleepWell = function(event) {
        event.preventDefault();
        networkInfo();
    };
})
.controller('sleepWellCtrl', function($scope, $q, MediaSrv, $rootScope, $ionicPopup) {
    $(document).ready(function() {
        $('#range-val').on("change mousemove", function() {
            //Lets change it in time mode
            var original_time = $(this).val();
            var new_time = formatSeconds(original_time);
            $("#time p").text(new_time);
            if($rootScope.adishVar) {
                $rootScope.adishVar.seekTo(parseInt(document.getElementById("range-val").value));
            }
        });
        /*
        ANOTHER GREAT WORK BY SOMEONE...
        http://jsfiddle.net/CYSeY/4/
        i just modify it
        */
        var r = document.getElementById('range-val');
        var max = r.getAttribute('max');
        var min = r.getAttribute('min');
        var w = r.clientWidth;
        //w += r.offsetLeft;
        var isDragging = false;

        var moveTip = (function(e) {
            if (isDragging) {
                var posPerc = (r.value / max) * 100;
                var pixPos = (posPerc / 100) * w - 40;
                /* pixPos += r.offsetLeft;*/

                document.getElementById('tip').style.display = 'block';
                document.getElementById('tip').style.left = pixPos + 'px';
            }
        });

        $("#range-val").mousemove(function() {
            isDragging = true;
            var range_val = document.getElementById("range-val").value;
            document.getElementById('tip').innerHTML = formatSeconds(range_val);
            r.addEventListener('mousemove', moveTip, false);
        });

        $("body").mouseup(function(e) {
            isDragging = false;
            r.removeEventListener('mousemove', moveTip);
            document.getElementById('tip').style.display = 'none';
        });
    });
    function formatSeconds(seconds) {
        var date = new Date(1970, 0, 1);
        date.setSeconds(seconds);
        return date.toTimeString().replace(/.*(\d{2}:\d{2}).*/, "$1");
    }
    $scope.play = function() {
        if(document.getElementById("gnButton").innerHTML == "►") {
            if(!$rootScope.adishVar) {
                MediaSrv.loadMedia('sound/song.mp3').then(function(media){
                    $rootScope.adishVar = media;
                    $rootScope.adishVar.play();
                    document.getElementById("gnButton").innerHTML = "&#9612;&#9612;"
                    $rootScope.intervalValue = setInterval(function() {
                        document.getElementById("range-val").value = parseInt(document.getElementById("range-val").value)+1;
                        var currentValue= document.getElementById("range-val").value;
                        document.getElementById("runningTime").innerHTML = Math.floor(parseInt(currentValue)/60) + ":" + parseInt(currentValue)%60;
                    },1000)
                });
            }
            else {
                $rootScope.adishVar.play();
                document.getElementById("gnButton").innerHTML = "&#9612;&#9612;"
                $rootScope.intervalValue = setInterval(function() {
                    document.getElementById("range-val").value = parseInt(document.getElementById("range-val").value)+1;
                    var currentValue= document.getElementById("range-val").value;
                    document.getElementById("runningTime").innerHTML = Math.floor(parseInt(currentValue)/60) + ":" + parseInt(currentValue)%60;
                },1000);
            }
        }
        else {
            $rootScope.adishVar.pause();
            document.getElementById("gnButton").innerHTML = "►";
            clearInterval($rootScope.intervalValue);
        }
    };
})
.controller('HistoryCtrl', function($scope) {
    $scope.bmiHistory = [];
    $scope.diabetesHistory = [];
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM BMI_HISTORY', [], function (tx, results) {
            var len = results.rows.length, i;
            for(var i=0; i< len; i++) {
                var a = {
                    "time": undefined,
                    "bmi": undefined
                }
                $scope.bmiHistory.push(a);
                $scope.bmiHistory[i].time = results.rows[i].dateValue;
                $scope.bmiHistory[i].bmi = results.rows[i].result;
                $scope.bmiHistory[i].uName = results.rows[i].uName;
            }
        }, null);
    });
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM DIABETES_HISTORY', [], function (tx, results) {
            var len = results.rows.length, i;
            for(var i=0; i< len; i++) {
                var a = {
                    "time": undefined,
                    "bmi": undefined
                }
                $scope.diabetesHistory.push(a);
                $scope.diabetesHistory[i].time = results.rows[i].dateValue;
                $scope.diabetesHistory[i].bmi = results.rows[i].result;
                $scope.diabetesHistory[i].uName = results.rows[i].uName;
            }
        }, null);
    });
    $scope.clearFunction = function(val) {
        if(val==0) {
            db.transaction(function (tx) {
                tx.executeSql('DELETE FROM BMI_HISTORY', [], function (tx, results) {
                    $scope.bmiHistory = [];
                    document.getElementById("bmiHistoryDiv").style.display= "none";
                });
            }, null);
        }
        else {
            db.transaction(function (tx) {
                tx.executeSql('DELETE FROM DIABETES_HISTORY', [], function (tx, results) {
                    $scope.diabetesHistory = [];
                    document.getElementById("diabHistoryDiv").style.display= "none";
                });
            }, null);
        }
    }
})
.controller('termsCtrl', function($scope, $location) {
    $scope.goBack = function(event) {
        event.preventDefault();
        $location.path('discover');
    }
})
.controller('privacyCtrl', function($scope, $location) {
    $scope.goBack = function(event) {
        event.preventDefault();
        $location.path('terms');
    }
    $scope.goHome = function(event) {
        event.preventDefault();
        $location.path('discover');
    }
})
.controller('BmiCtrl', function($scope, $ionicPopup, $location, $cordovaSocialSharing) {
    $scope.wtArr = [];
    $scope.uName = {
        val:''
    };
    $scope.bmi= {
        gender: "true"
    }
    $scope.bmiCalDone = false;
    var heightInMeters = 0;
    var bmiValue = 0;
    var msg = "";
    for(var i=40; i<=149; i++) {
        $scope.wtArr.push(i);
    };
    $scope.shareAnywhere = function() {
        var myBMI = "Just calculated my BMI using this super awesome app!! My BMI is " + bmiValue +  "Try it now!!";
        var myMsg = msg;
        $cordovaSocialSharing.share(myBMI, myMsg, "www/img/icon.png", "http://play.google.com/store/apps/details?id=com.ionicframework.sugart07");
    }
    $scope.diabRedirect = function() {
        $location.path('app/favorites');
    }
    $scope.calculateBMI = function(height, weight) {
        if($scope.uName.val == '' || $scope.uName.val==undefined) {
            var alertPopup23 = $ionicPopup.alert({
                title: 'ERROR',
                template: 'Please enter your name'
            });
        }
        else {
            if(height == 0 || height =="4.10") {
                heightInMeters = 1.473;
            }
            else if(height == 1) {
                heightInMeters = 1.499;
            }
            else if(height == 2) {
                heightInMeters = 1.524;
            }
            else if(height == 3) {
                heightInMeters = 1.549;
            }
            else if(height == 4) {
                heightInMeters = 1.575;
            }
            else if(height == 5) {
                heightInMeters = 1.600;
            }
            else if(height == 6) {
                heightInMeters = 1.626;
            }
            else if(height == 7) {
                heightInMeters = 1.651;
            }
            else if(height == 8) {
                heightInMeters = 1.676;
            }
            else if(height == 9) {
                heightInMeters = 1.702;
            }
            else if(height == 10) {
                heightInMeters = 1.727;
            }
            else if(height == 11) {
                heightInMeters = 1.753;
            }
            else if(height == 12) {
                heightInMeters = 1.778;
            }
            else if(height == 13) {
                heightInMeters = 1.803;
            }
            else if(height == 14) {
                heightInMeters = 1.829;
            }
            else if(height == 15) {
                heightInMeters = 1.854;
            }
            else if(height == 16) {
                heightInMeters = 1.880;
            }
            else if(height == 17) {
                heightInMeters = 1.905;
            }
            else if(height == 18) {
                heightInMeters = 1.930;
            }
            bmiValue = weight / (heightInMeters * heightInMeters);
            if($scope.bmi.gender == "true") {
                if(bmiValue < 18.5) {
                    msg = "You are underweight.";
                    templateMessage = '<div class="outerAlert"><div class="inner1"><img width="100%" height="100%" src="img/under.jpg"></div><div class="inner2" style="width:55%; height: 97px;"><p class="alertText">' + msg + '</p></div></div>';
                }
                else if(bmiValue>=18.5 && bmiValue <24.9) {
                    msg = "You are normal.";
                    templateMessage = '<div class="outerAlert"><div class="inner1"><img width="100%" height="100%" src="img/fit.png"></div><div class="inner2" style="width:55%; height: 97px;"><p class="alertText">' + msg + '</p></div></div>';
                }
                else if(bmiValue>=24.9 && bmiValue <29.9) {
                    msg = "You are overweight.";
                    templateMessage = '<div class="outerAlert"><div class="inner1"><img width="100%" height="100%" src="img/obese.jpg"></div><div class="inner2" style="width:55%; height: 97px;"><p class="alertText">' + msg + '</p></div></div>';
                }
                else if(bmiValue>=29.9) {
                    msg = "You are obese.";
                    templateMessage = '<div class="outerAlert"><div class="inner1"><img width="100%" height="100%" src="img/obese.jpg"></div><div class="inner2" style="width:55%; height: 97px;"><p class="alertText">' + msg + '</p></div></div>';
                }
            }
            else if($scope.bmi.gender == "false") {
                if(bmiValue < 18.5) {
                    msg = "You are underweight.";
                    templateMessage = '<div class="outerAlert"><div class="inner1"><img width="100%" height="100%" src="img/under.jpg"></div><div class="inner2" style="width:55%; height: 97px;"><p class="alertText">' + msg + '</p></div></div>';
                }
                else if(bmiValue>=18.5 && bmiValue <26.9) {
                    msg = "You are normal.";
                    templateMessage = '<div class="outerAlert"><div class="inner1"><img width="100%" height="100%" src="img/fit.png"></div><div class="inner2" style="width:55%; height: 97px;"><p class="alertText">' + msg + '</p></div></div>';
                }
                else if(bmiValue>=26.9 && bmiValue <31.9) {
                    msg = "You are overweight.";
                    templateMessage = '<div class="outerAlert"><div class="inner1"><img width="100%" height="100%" src="img/obese.jpg"></div><div class="inner2" style="width:55%; height: 97px;"><p class="alertText">' + msg + '</p></div></div>';
                }
                else if(bmiValue>=31.9) {
                    msg = "You are obese.";
                    templateMessage = '<div class="outerAlert"><div class="inner1"><img width="100%" height="100%" src="img/obese.jpg"></div><div class="inner2" style="width:55%; height: 97px;"><p class="alertText">' + msg + '</p></div></div>';
                }
            }
            bmiValue = Math.round(bmiValue*100)/100;
            $scope.bmiCalDone = true;
            db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM BMI_HISTORY', [], function (tx, results) {
                    var len = results.rows.length, i;
                    if(len == 5) {
                        tx.executeSql("DELETE FROM BMI_HISTORY WHERE id=?", [1]);
                        tx.executeSql('INSERT INTO BMI_HISTORY (id, result, dateValue, uName) VALUES (?, ?, ?, ?)', [len+1, bmiValue, new Date().getDate() + "/" +  (new Date().getMonth() + 1) + "/" +  new Date().getFullYear().toString().substr(2,2), $scope.uName.val]);
                    }
                    else {
                        tx.executeSql('INSERT INTO BMI_HISTORY (id, result, dateValue, uName) VALUES (?, ?, ?, ?)', [len+1, bmiValue, new Date().getDate() + "/" +  (new Date().getMonth() + 1) + "/" +  new Date().getFullYear().toString().substr(2,2), $scope.uName.val]);
                    }
                }, null);
            });
            var alertPopup = $ionicPopup.alert({
                title: 'Hi ' + $scope.uName.val + ', your BMI is: ' + bmiValue,
                template: templateMessage,
                scope: $scope,
                buttons: [
                    { text: 'OK',
                    type: 'button-positive',
                },
                {
                    text: '<b>Share</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        $scope.shareAnywhere();
                    }
                }
            ]
        });
    }
};
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
$scope.bmiCal = {
    ht: "4.10",
    weight: 40
}
})


/*
Controller for the favorites page
*/
.controller('FavoritesCtrl', function($scope, $ionicPopup, $cordovaSocialSharing) {
    var titleDisplay = "";
    $scope.ageArr = [];
    $scope.uName = {
        "val":''
    }
    $scope.displayProgress = false;
    $scope.scored = false;
    var score = 0;
    for(var i=0; i<=70; i++) {
        $scope.ageArr.push(i+20);
    }
    $scope.wtArr = [];
    for(var i=40; i<=149; i++) {
        $scope.wtArr.push(i);
    }
    $scope.gesMeaning = function() {
        var alertPopup1 = $ionicPopup.alert({
            title: 'Gestational Diabetes meaning',
            template: '<span  style="font-weight:500;">Pregnant women who have never had diabetes before but who have high blood glucose (sugar) levels during pregnancy are said to have gestational diabetes.</span>'
        });
    }

    $scope.shareAnywhere = function() {
        var myBMI = "Just calculated my Diabetic risk score using this super awesome app!! Try it now!!"
        var myMsg = "Diabetes risk test.";
        $cordovaSocialSharing.share(myBMI, myMsg, "www/img/icon.png", "http://play.google.com/store/apps/details?id=com.ionicframework.sugart07");
    }

    $scope.calculateDiabities = function(age, gender, ges, fam, bp, fit, ht, weight, ev) {
        if($scope.uName.val=='' || $scope.uName.val == undefined) {
            var alertPopup = $ionicPopup.alert({
                title: 'ERROR',
                template: 'Please enter your name.'
            });
        }
        else {
            $scope.displayProgress = true;
            score = 0;
            var displayMessage = "";
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
                if(ht == 0 || ht =="4.10") {
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
                if(ht == 1) {
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
                if(ht == 2) {
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
                if(ht == 3) {
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
                if(ht == 4) {
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
                if(ht == 5) {
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
                if(ht == 6) {
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
                if(ht == 7) {
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
                if(ht == 8) {
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
                if(ht == 9) {
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
                if(ht == 10) {
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
                if(ht == 11) {
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
                if(ht == 12) {
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
                if(ht == 13) {
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
                if(ht == 14) {
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
                if(ht == 15) {
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
                if(ht == 16) {
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
                if(ht == 17) {
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
                if(ht == 18) {
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
            if(score > 5) {
                if(score == 6){
                    titleDisplay = "Hi " + $scope.uName.val + "!!"
                    displayMessage = '<div class="outerAlert"><div id="el" data-value="6"><span style="transform:rotate(108deg)" id="needle"></span></div><div class="inner2" style="vertical-align: top;"><p class="alertText">' + 'Your Diabetes risk score is ' + score + '. You are at risk of being diagnosed with Diabetes.' + '</p></div></div>';
                }
                else if(score == 7){
                    titleDisplay =  "Hi " + $scope.uName.val + "!!"
                    displayMessage = '<div class="outerAlert"><div id="el" data-value="7"><span style="transform:rotate(126deg)" id="needle"></span></div><div class="inner2" style="vertical-align: top;"><p class="alertText">' + 'Your Diabetes risk score is ' + score + '. You are at risk of being diagnosed with Diabetes.' + '</p></div></div>';
                }
                else if(score == 8){
                    titleDisplay =  "Hi " + $scope.uName.val + "!!"
                    displayMessage = '<div class="outerAlert"><div id="el" data-value="8"><span style="transform:rotate(144deg)" id="needle"></span></div><div class="inner2" style="vertical-align: top;"><p class="alertText">' + 'Your Diabetes risk score is ' + score + '. You are at risk of being diagnosed with Diabetes.' + '</p></div></div>';
                }
                else if(score == 9){
                    titleDisplay =  "Hi " + $scope.uName.val + "!!"
                    displayMessage = '<div class="outerAlert"><div id="el" data-value="9"><span style="transform:rotate(162deg)" id="needle"></span></div><div class="inner2" style="vertical-align: top;"><p class="alertText">' + 'Your Diabetes risk score is ' + score + '. You are at risk of being diagnosed with Diabetes.' + '</p></div></div>';
                }
                else if(score == 10){
                    titleDisplay =  "Hi " + $scope.uName.val + "!!"
                    displayMessage = '<div class="outerAlert"><div id="el" data-value="10"><span style="transform:rotate(180deg)" id="needle"></span></div><div class="inner2" style="vertical-align: top;"><p class="alertText">' + 'Your Diabetes risk score is ' + score + '. You are at risk of being diagnosed with Diabetes.' + '</p></div></div>';
                }
            }
            if(score <=5) {
                if(score == 0) {
                    titleDisplay =  "Hi " + $scope.uName.val + "!!"
                    displayMessage = '<div class="outerAlert"><div id="el" data-value="0"><span style="transform:rotate(0deg)" id="needle"></span></div><div class="inner2" style="vertical-align: top;"><p class="alertText">' +  'Your Diabetes risk score is ' + score + '. You are not at risk of being diagnosed with Diabetes.' + '</p></div></div>';
                }
                else if(score == 1) {
                    titleDisplay =  "Hi " + $scope.uName.val + "!!"
                    displayMessage = '<div class="outerAlert"><div id="el" data-value="1"><span style="transform:rotate(18deg)" id="needle"></span></div><div class="inner2" style="vertical-align: top;"><p class="alertText">' +  'Your Diabetes risk score is ' + score + '. You are not at risk of being diagnosed with Diabetes.' + '</p></div></div>';
                }
                else if(score == 2) {
                    titleDisplay =  "Hi " + $scope.uName.val + "!!"
                    displayMessage = '<div class="outerAlert"><div id="el" data-value="2"><span style="transform:rotate(36deg)" id="needle"></span></div><div class="inner2" style="vertical-align: top;"><p class="alertText">' +  'Your Diabetes risk score is ' + score + '. You are not at risk of being diagnosed with Diabetes.' + '</p></div></div>';
                }
                else if(score == 3) {
                    titleDisplay =  "Hi " + $scope.uName.val + "!!"
                    displayMessage = '<div class="outerAlert"><div id="el" data-value="3"><span style="transform:rotate(54deg)" id="needle"></span></div><div class="inner2" style="vertical-align: top;"><p class="alertText">' +  'Your Diabetes risk score is ' + score + '. You are not at risk of being diagnosed with Diabetes.' + '</p></div></div>';
                }
                else if(score == 4) {
                    titleDisplay =  "Hi " + $scope.uName.val + "!!"
                    displayMessage = '<div class="outerAlert"><div id="el" data-value="4"><span style="transform:rotate(72deg)" id="needle"></span></div><div class="inner2" style="vertical-align: top;"><p class="alertText">' +  'Your Diabetes risk score is ' + score + '. You are not at risk of being diagnosed with Diabetes.' + '</p></div></div>';
                }
                else if(score == 5) {
                    titleDisplay =  "Hi " + $scope.uName.val + "!!"
                    displayMessage = '<div class="outerAlert"><div id="el" data-value="5"><span style="transform:rotate(90deg)" id="needle"></span></div><div class="inner2" style="vertical-align: top;"><p class="alertText">' +  'Your Diabetes risk score is ' + score + '. You are not at risk of being diagnosed with Diabetes.' + '</p></div></div>';
                }
            }
            db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM DIABETES_HISTORY', [], function (tx, results) {
                    var len = results.rows.length, i;
                    if(len == 5) {
                        tx.executeSql("DELETE FROM DIABETES_HISTORY WHERE id=?", [1]);
                        tx.executeSql('INSERT INTO DIABETES_HISTORY (id, result, dateValue, uName) VALUES (?, ?, ?, ?)', [len+1, score, new Date().getDate() + "/" +  (new Date().getMonth() + 1) + "/" +  new Date().getFullYear().toString().substr(2,2), $scope.uName.val]);
                    }
                    else {
                        tx.executeSql('INSERT INTO DIABETES_HISTORY (id, result, dateValue, uName) VALUES (?, ?, ?, ?)', [len+1, score, new Date().getDate() + "/" +  (new Date().getMonth() + 1) + "/" +  new Date().getFullYear().toString().substr(2,2), $scope.uName.val]);
                    }
                }, null);
            });
            var alertPopup = $ionicPopup.alert({
                title: titleDisplay,
                template: displayMessage,
                scope: $scope,
                buttons: [
                    { text: 'OK',
                    type: 'button-positive',
                },
                {
                    text: '<b>Share</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        $scope.shareAnywhere();
                    }
                }
            ]
        });
    }
    // document.getElementById("needle").style.transform = "rotate(180deg)";
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
    ht: "4.10",
    weight: 40
}
})


/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope) {

});
