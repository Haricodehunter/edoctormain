var app = angular.module('myGallery', ['ui.router']);

app.config(function( $stateProvider , $urlRouterProvider) {


  $urlRouterProvider.otherwise('/');  
  //$routeProvider

      // route for the home page
      // .when('/', {
      //     templateUrl : 'pages/smain.html',
      //     controller  : 'symptomcontroller',
      //     label: 'Female'
      // })

      // // route for the about page
      // .when('/male', {
      //     templateUrl : 'pages/male.html',
      //     controller  : 'symptomcontroller',
      //     label: 'Female'
      // })

      // // route for the contact page
      // .when('/female', {
      //     templateUrl : 'pages/female.html',
      //     controller  : 'symptomcontroller',
      //     label: 'Female'
      // })
      // .when('/symptomsinner', {
      //     templateUrl : 'pages/symptomsinner.html',
      //     controller  : 'symptomcontroller',
      //     label: 'Symptoms'
      // })
      // .when('/symptomsinner/Legs', {
      //     templateUrl : 'pages/symptoms/parts.html',
      //     controller  : 'symptomcontroller',
      //     label: 'Legs'
      // });


      $stateProvider
            .state('symptoms', {
               
                url: '/',
                templateUrl : 'pages/smain.html',
                controller  : 'symptomcontroller',
                label: 'Symptoms',
                data: {
                  displayName: 'Symptoms',
              }
            })
      
            // route for the about page
            .state('male', {
              url: '/male',
              name:'male',
                templateUrl : 'pages/male.html',
                controller  : 'symptomcontroller',
                label: 'Male',
                data: {
                  displayName: 'Male',
              }
            })
           
            // route for the contact page
            .state('female', {
            
              url: '/female',
                templateUrl : 'pages/female.html',
                controller  : 'symptomcontroller',
                label: 'Female',
                data: {
                  displayName: 'Female',
              }
            })
           
            .state('male.symptomsinner', {
                url: '/male/symptomsdet/:parts',
                templateUrl : 'pages/male/symptomsdetail.html',
                controller  : 'malecontroller',
                label: 'Symptoms',
                data: {
                  displayName: 'Symptoms',
              }
            })
            .state('male.symptomdetialdis', {
              url: '/bronchits',
              templateUrl : 'pages/male/symptomsdiseasecon.html',
              controller  : 'malecontroller',
              label: 'Bronchitis',
              data: {
                displayName: 'Bronchitis',
            }
          })
          .state('female.symptomdetialdis', {
            url: '/bronchits',
            templateUrl : 'pages/female/symptomsdiseasecon.html',
            controller  : 'femalecontroller',
            label: 'Bronchitis',
            data: {
              displayName: 'Bronchitis',
          }
        })
            .state('female.symptomsinner', {
              url: '/female/symptomsdet/:parts',
              templateUrl : 'pages/female/symptomsdetail.html',
              controller  : 'femalecontroller',
              label: 'Symptoms',
              data: {
                displayName: 'Symptoms',
            }
          });
            
});
app.run(function ($state,$rootScope) {
  $rootScope.$state = $state;
})
app.controller('Gallery', function ($scope) {
  $scope.view ="";
  $scope.images = [
    {
        "WebMediaContent": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        "WebMediaID": "5754",
        "WebMediaMainImage": "http://edoccms.graffitecs.com/Data/Images/profile/profile-image.png",
        "WebMediaTitle": "Video One",
        "WebMediaUniqueName": "video.one",
        "WebMediaVideoURL": "https://www.youtube.com/embed/hgzzLIa-93c?autoplay=1& modestbranding=1&rel=0&hl=sv"
    },
    {
        "WebMediaContent": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        "WebMediaID": "5755",
        "WebMediaMainImage": "http://edoccms.graffitecs.com/Data/Images/profile/profile-image.png",
        "WebMediaTitle": "Video One",
        "WebMediaUniqueName": "video.one",
        "WebMediaVideoURL": "https://www.quirksmode.org/html5/videos/big_buck_bunny.mp4"
    }
  ];
  $scope.handleImgClick = function(img) {
    $scope.view = img;
  }
  $scope.handleUpDown = function(dir, view) {
    var currentImgIndex = $scope.images.indexOf(view);
    if(dir == "down") {
      currentImgIndex = currentImgIndex+1
    } else {
        currentImgIndex = currentImgIndex-1
    }
    if ($scope.images.length == currentImgIndex) {
      currentImgIndex  = 0;
    } else if (currentImgIndex<0) {
      currentImgIndex= $scope.images.length-1
    }
      $scope.view =  $scope.images[currentImgIndex]
  }
});
