app.controller('symptomcontroller', function ($scope, $rootScope, $http, $stateParams) {
 
    $scope.imgmale="img/malefront.png";
    $scope.imgfemale="img/femalefront.png";
    $scope.BackView = true;
    $scope.malemapview = 'malefrontimage-map';
    $scope.femalemapview = 'femalefrontimage-map';
    $scope.RotateImg = function(Gender, direction){
        $scope.BackView=!$scope.BackView;
        if(Gender=="male"){
            $scope.imgmale="img/male"+direction+".png"
          
           
        }else{
            $scope.imgfemale="img/female"+direction+".png"
            
        }
        if(direction=="front"){
            $scope.malemapview = 'malefrontimage-map';
            $scope.femalemapview = 'femalefrontimage-map';
        }else{
            $scope.malemapview = 'malebackimage-map';
            $scope.femalemapview = 'femalebackimage-map';
        }
    }
 

   

});


app.controller('malecontroller', function ($scope, $rootScope, $http, $stateParams) {
    $scope.parts = $stateParams.parts;
    $scope.id = $stateParams.id;
    $scope.sid = $stateParams.sid;
    $scope.name = $stateParams.name;
    $scope.uname = $stateParams.uniq;
    var hdata = {
        "nWebsite":"1",
        "nLanguage":"1",
        "nBodyPart": $scope.id ,
        "nPageSize":"10",
        "nPageKey":"1"
    };
    
    
    var req = {
      method: 'POST',
      url: 'http://edoccms.graffitecs.com/Plugins/Edoctors/Edoctors.svc/GetSymptoms',
      headers: {"UsernameToken":"200ceb26807d6bf99fd6f4f0d1ca54d4",
      "PasswordToken":"382e0360e4eb7b70034fbaa69bec5786"},
      data: hdata
     }
     
     $http(req).then(function successCallback(response){
      $rootScope.symptomsbypart = response.data.GetSymptomsResult.WebSymptomsArray;
      
      console.log($rootScope.symptomsbypart);
    
     
      }, function errorCallback(){
    
        console.log("unable fetch data");
      });
      var symhdata = {
        "nWebsite":"1",
        "nLanguage":"1",
        "nBodyPart":"-1",
        "nPageSize":"100",
        "nPageKey":"1"
    };
    var symreq = {
      method: 'POST',
      url: 'http://edoccms.graffitecs.com/Plugins/Edoctors/Edoctors.svc/GetSymptoms',
      headers: {"UsernameToken":"200ceb26807d6bf99fd6f4f0d1ca54d4",
      "PasswordToken":"382e0360e4eb7b70034fbaa69bec5786"},
      data: symhdata
     }
     
     $http(symreq).then(function successCallback(response){
    
    
    
      $rootScope.symptomsall = response.data.GetSymptomsResult.WebSymptomsArray;
      
      console.log($rootScope.symptomsall);
    
     
      }, function errorCallback(){
    
        console.log("unable fetch data");
      });

      $scope.datalists =  $rootScope.symptomsall; // json data
      
      //show more functionality
      
      var pagesShown = 1;
      
      var pageSize = 10;
      
      $scope.paginationLimit = function(data) {
       return pageSize * pagesShown;
      };
      
      $scope.hasMoreItemsToShow = function() {
        if($scope.datalists.length!=null){
            return pagesShown < ($scope.datalists.length / pageSize);
        }
      };
      
      $scope.showMoreItems = function() {
       pagesShown = pagesShown + 1; 
      
      }; 

      var symCauses = {
        "nWebsite":"1",
        "nLanguage":"1",
        "nSymptomID":"-1",
        "nPageSize":"100",
        "nPageKey":"1"
    };
    var symcareq = {
      method: 'POST',
      url: 'http://edoccms.graffitecs.com/Plugins/Edoctors/Edoctors.svc/GetCausesBySymptom',
      headers: {"UsernameToken":"200ceb26807d6bf99fd6f4f0d1ca54d4",
      "PasswordToken":"382e0360e4eb7b70034fbaa69bec5786"},
      data: symCauses
     }
     
     $http(symcareq).then(function successCallback(response){
    
    
    
      $rootScope.sympcauses = response.data.GetCausesBySymptomResult.WebCausesArray[0];
      
      console.log($rootScope.sympcauses);
    
     
      }, function errorCallback(){
    
        console.log("unable fetch data");
      });

      var hosahdata = {
        "nWebsite":"1",
        "nLanguage":"1"
    };
    
    
    var hosareq = {
      method: 'POST',
      url: 'http://edoccms.graffitecs.com/Plugins/Edoctors/Edoctors.svc/GetArea',
      headers: {"UsernameToken":"200ceb26807d6bf99fd6f4f0d1ca54d4",
      "PasswordToken":"382e0360e4eb7b70034fbaa69bec5786"},
      data: hosahdata
     }
     
     $http(hosareq).then(function successCallback(response){
      $rootScope.hosarea = response.data.GetAreaResult.WebAreaArray;
      console.log( $rootScope.hosarea);
    
      }, function errorCallback(){
    
        console.log("unable to fetch area data");
      });



    $('.hospitalslide').owlCarousel({
        loop:false,
        nav:true,
        margin:10,
        dots:false,
        navText: [
            "<i class='fa fa-caret-left'></i>",
            "<i class='fa fa-caret-right'></i>"
          ],
          autoplay: true,
          autoplayHoverPause: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:4
            }
        }
      });


      $scope.changedValue =function(selvalue){
        console.log(selvalue);
        $scope.showhos = true;
        var hosserdata = {
            "nWebsite":1,
            "nLanguage":1,
            "nKeyword":"",
            "nSpecialtity":-1,
            "nArea":selvalue,
            "nInsuranceID":-1,
            "nPageSize":10,
            "nPageKey":1
        };
        var hosserreq = {
            method: 'POST',
            url: 'http://edoccms.graffitecs.com/Plugins/Edoctors/Edoctors.svc/GetHospitalLIsting',
            headers: {"UsernameToken":"200ceb26807d6bf99fd6f4f0d1ca54d4",
            "PasswordToken":"382e0360e4eb7b70034fbaa69bec5786"},
            data: hosserdata
           }
           
           $http(hosserreq).then(function successCallback(response){
            $rootScope.hosserinsurance = response.data.GetHospitalLIstingResult.WebHospitalArray;
            console.log( $rootScope.hosserinsurance);
            $timeout(function(){
                
                            
                            $('.hospitalslide').owlCarousel({
                                loop:false,
                                nav:true,
                                margin:10,
                                dots:false,
                                navText: [
                                    "<i class='fa fa-caret-left'></i>",
                                    "<i class='fa fa-caret-right'></i>"
                                  ],
                                  autoplay: true,
                                  autoplayHoverPause: true,
                                responsive:{
                                    0:{
                                        items:1
                                    },
                                    600:{
                                        items:2
                                    },
                                    1000:{
                                        items:4
                                    }
                                }
                              });
                        
                            },4000);
          
            }, function errorCallback(){
          
              console.log("unable to fetch area data");
            });
      
 
     }


});

   
app.controller('femalecontroller', function ($scope, $rootScope, $http, $timeout, $stateParams) {
    $scope.parts = $stateParams.parts;
    $scope.id = $stateParams.id;
    $scope.sid = $stateParams.sid;
    $scope.name = $stateParams.name;
    $scope.uname = $stateParams.uniq;
    var hdata = {
        "nWebsite":"1",
        "nLanguage":"1",
        "nBodyPart": $scope.id ,
        "nPageSize":"10",
        "nPageKey":"1"
    };
    
    
    var req = {
      method: 'POST',
      url: 'http://edoccms.graffitecs.com/Plugins/Edoctors/Edoctors.svc/GetSymptoms',
      headers: {"UsernameToken":"200ceb26807d6bf99fd6f4f0d1ca54d4",
      "PasswordToken":"382e0360e4eb7b70034fbaa69bec5786"},
      data: hdata
     }
     
     $http(req).then(function successCallback(response){
      $rootScope.symptomsbypart = response.data.GetSymptomsResult.WebSymptomsArray;
      
      console.log($rootScope.symptomsbypart);
    
     
      }, function errorCallback(){
    
        console.log("unable fetch data");
      });
      var symhdata = {
        "nWebsite":"1",
        "nLanguage":"1",
        "nBodyPart":"-1",
        "nPageSize":"100",
        "nPageKey":"1"
    };
    var symreq = {
      method: 'POST',
      url: 'http://edoccms.graffitecs.com/Plugins/Edoctors/Edoctors.svc/GetSymptoms',
      headers: {"UsernameToken":"200ceb26807d6bf99fd6f4f0d1ca54d4",
      "PasswordToken":"382e0360e4eb7b70034fbaa69bec5786"},
      data: symhdata
     }
     
     $http(symreq).then(function successCallback(response){
    
    
    
        $rootScope.symptomsall = response.data.GetSymptomsResult.WebSymptomsArray;
      
      console.log($rootScope.symptomsall);
    
     
    
      }, function errorCallback(){
    
        console.log("unable fetch data");
      });


      $scope.datalists =  $rootScope.symptomsall; // json data
      
      //show more functionality
      
      var pagesShown = 1;
      
      var pageSize = 10;
      
      $scope.paginationLimit = function(data) {
       return pageSize * pagesShown;
      };
      
      $scope.hasMoreItemsToShow = function() {
        if($scope.datalists.length!=null){
            return pagesShown < ($scope.datalists.length / pageSize);
        }
      };
      
      $scope.showMoreItems = function() {
       pagesShown = pagesShown + 1; 
      
      }; 

 console.log($scope.sid, $scope.name, $scope.uname);
      var symCauses = {
        "nWebsite":"1",
        "nLanguage":"1",
        "nSymptomID":"-1",
        "nPageSize":"100",
        "nPageKey":"1"
    };
    var symcareq = {
      method: 'POST',
      url: 'http://edoccms.graffitecs.com/Plugins/Edoctors/Edoctors.svc/GetCausesBySymptom',
      headers: {"UsernameToken":"200ceb26807d6bf99fd6f4f0d1ca54d4",
      "PasswordToken":"382e0360e4eb7b70034fbaa69bec5786"},
      data: symCauses
     }
     
     $http(symcareq).then(function successCallback(response){
    
    
    
      $rootScope.sympcauses = response.data.GetCausesBySymptomResult.WebCausesArray[0];
      
      console.log($rootScope.sympcauses);
    
     
      }, function errorCallback(){
    
        console.log("unable fetch data");
      });

      var hosahdata = {
        "nWebsite":"1",
        "nLanguage":"1"
    };
    
    
    var hosareq = {
      method: 'POST',
      url: 'http://edoccms.graffitecs.com/Plugins/Edoctors/Edoctors.svc/GetArea',
      headers: {"UsernameToken":"200ceb26807d6bf99fd6f4f0d1ca54d4",
      "PasswordToken":"382e0360e4eb7b70034fbaa69bec5786"},
      data: hosahdata
     }
     
     $http(hosareq).then(function successCallback(response){
      $rootScope.hosarea = response.data.GetAreaResult.WebAreaArray;
      console.log( $rootScope.hosarea);
    
      }, function errorCallback(){
    
        console.log("unable to fetch area data");
      });


    $('.hospitalslide').owlCarousel({
        loop:false,
        nav:true,
        margin:10,
        dots:false,
        navText: [
            "<i class='fa fa-caret-left'></i>",
            "<i class='fa fa-caret-right'></i>"
          ],
          autoplay: true,
          autoplayHoverPause: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:4
            }
        }
      });
      $rootScope.hosserinsurance='';
      $scope.changedValue =function(selvalue){
        console.log(selvalue);
        $scope.showhos = true;
        var hosserdata = {
            "nWebsite":1,
            "nLanguage":1,
            "nKeyword":"",
            "nSpecialtity":-1,
            "nArea":selvalue,
            "nInsuranceID":-1,
            "nPageSize":10,
            "nPageKey":1
        };
        var hosserreq = {
            method: 'POST',
            url: 'http://edoccms.graffitecs.com/Plugins/Edoctors/Edoctors.svc/GetHospitalLIsting',
            headers: {"UsernameToken":"200ceb26807d6bf99fd6f4f0d1ca54d4",
            "PasswordToken":"382e0360e4eb7b70034fbaa69bec5786"},
            data: hosserdata
           }
           
           $http(hosserreq).then(function successCallback(response){
            $rootScope.hosserinsurance = response.data.GetHospitalLIstingResult.WebHospitalArray;
            console.log( $rootScope.hosserinsurance);
            $timeout(function(){

            
            $('.hospitalslide').owlCarousel({
                loop:false,
                nav:true,
                margin:10,
                dots:false,
                navText: [
                    "<i class='fa fa-caret-left'></i>",
                    "<i class='fa fa-caret-right'></i>"
                  ],
                  autoplay: true,
                  autoplayHoverPause: true,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:2
                    },
                    1000:{
                        items:4
                    }
                }
              });
        
            },4000);
            }, function errorCallback(){
          
              console.log("unable to fetch area data");
            });
      
 
     }
 
});