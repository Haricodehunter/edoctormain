var app = angular.module('Edoctor', ['ui.router','ngResource','ui.bootstrap','angular-page-loader']);


app.run(function($timeout, $rootScope) {
  
    // Use a root scope flag to access everywhere in your app
    $rootScope.isLoading = true;
    // simulate long page loading
    $timeout(function() {
  
      // turn "off" the flag
      $rootScope.isLoading = false;
  
    }, 3000)
  
  })
app.config(function( $stateProvider , $urlRouterProvider) {


  $urlRouterProvider.otherwise('/');  
      $stateProvider

              .state('home', {
                url: '/',
                templateUrl : 'pages/home-page.html',
                controller  : 'Homecontroller',
                label: 'home',
                data: {
                  displayName: 'Homepage',
              }
            
            })
            .state('healthtips', {
              url: '/healthtips',
              templateUrl : 'pages/Healthtips.html',
              controller  : 'Healthtipscontroller',
              label: 'Health Tips',
              data: {
                displayName: 'Health Tips',
            }
          
          })
          .state('videos', {
            url: '/videos',
            templateUrl : 'pages/videos.html',
            controller  : 'videoscontroller',
            label: 'Health Tips',
            data: {
              displayName: 'Health Tips',
          }
        })
        .state('aboutus', {
          url: '/aboutus',
          templateUrl : 'pages/about_edoctors.html',
          controller  : 'aboutcontroller',
          label: 'About Us',
          data: {
            displayName: 'About us',
        }
      })
            .state('symptoms', {
               
                url: '/symptoms',
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

app.controller('Homecontroller', function ($scope, $rootScope, $http, HomeService,$timeout) {

  var hdata = {
    "nWebsiteID":"1", 
      "nLanguageID":"1", 
      "nTopHeaderLogos":"top.header.logo",
      "nMenuUniqueName":"main.menu",
      "nHomeCarasoulBanner":"home.header.carousal.banner",
      "nHomeFeaturedContentBanners":"home.content.featured.banner",
      "nFooterSocialBanners":"footer.social",
      "nFooterDownloadApp":"download.app",
      "nHomeTopNewsCount":"1",
      "nHomeFeaturNewsCount":"20",
      "nHomeFeaturDoctorsCount":"3",
      "nHomeFeaturVideoCount":"4",
      "nFooterQuickLinks":"quick.links",
      "nFooterLinks":"footer.links",
      "nFooterDisclaimer":"disclaimer.message",
      "nPollUniquename":"what.you.think.about.our.website",
      "nHappinessUniqueName":"happiness.indicator",
      "nTopNewsCategoryUniqueName":"news",
      "nHomeFeatureArticlesUniqueName":"article"
};
 
    

  var req = {
    method: 'POST',
    url: 'http://edoccms.graffitecs.com/Plugins/HomePage/HomePageDataService.svc/GetHomeData',
    headers: {"UsernameToken":"200ceb26807d6bf99fd6f4f0d1ca54d4",
    "PasswordToken":"382e0360e4eb7b70034fbaa69bec5786"},
    data: hdata
   }
   
   $http(req).then(function successCallback(response){
    $rootScope.homeData = response.data.GetHomeDataResult;
     
    console.log($rootScope.homeData);

    $rootScope.menu =response.data.GetHomeDataResult.MainMenu; 
    $rootScope.Homepagebanner =response.data.GetHomeDataResult.HomeCarsoulBanners; 
    $rootScope.HomeTopLatestNews = response.data.GetHomeDataResult.HomeTopLatestNews;

    $rootScope.HomeCounter = response.data.GetHomeDataResult.HomeCounter;
    $rootScope.footlinks = response.data.GetHomeDataResult.FooterLinks;


    console.log($rootScope.footlinks);
    
    }, function errorCallback(){

      console.log("unable fetch data");
    });
   

    $scope.dropdown = function(menu)
    {
     $scope.submenu = menu.SubMenu.length;

        $scope.dropdownlength = ($scope.submenu > 0) ? true : false;
        return $scope.dropdownlength;
    }
    $timeout(function() {
      
        $('.videoslider').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          asNavFor: '.videoslider-nav'
        });
        $('.videoslider-nav').slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
          loop:true,
          prevArrow:'<button type="button" class="slick-prev"></button>',
          nextArrow:'<button type="button" class="slick-next"></button>',
          asNavFor: '.videoslider',
          dots: false,
          vertical: true,
          centerMode: false,
          focusOnSelect: true
        });
        $('.doctorslideinner').slick({
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: true,
          loop:true,
          prevArrow:' <a class="left carousel-control" href="#theDoctorCarousel" data-slide="prev"><img src="img/dprevarrow.png" alt=""></a>',
          nextArrow:' <a class="right carousel-control" href="#theDoctorCarousel" data-slide="next"><img src="img/dnextarrow.png" alt=""></a>',
          dots: false,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }]
          
         
        });
      },3500);
      

  
});

app.controller('Healthtipscontroller', function ($scope, $rootScope, $http, HomeService,$timeout) {

});
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


app.run(function(HomeService) {
  var payload = {
    "nWebsiteID":"1", 
    "nLanguageID":"1", 
    "nTopHeaderLogos":"top.header.logo",
    "nMenuUniqueName":"main.menu",
    "nHomeCarasoulBanner":"home.header.carousal.banner",
    "nHomeFeaturedContentBanners":"home.content.featured.banner",
    "nFooterSocialBanners":"footer.social",
    "nFooterDownloadApp":"download.app",
    "nHomeTopNewsCount":"1",
    "nHomeFeaturNewsCount":"20",
    "nHomeFeaturDoctorsCount":"3",
    "nHomeFeaturVideoCount":"4",
    "nFooterQuickLinks":"quick.links",
    "nFooterLinks":"footer.links",
    "nFooterDisclaimer":"disclaimer.message",
    "nPollUniquename":"what.you.think.about.our.website",
    "nHappinessUniqueName":"happiness.indicator"    
  };
  HomeService.save({}, payload)
})
app.factory('HomeService', ['$resource', function($resource) {
  var hdata = {
    "nWebsiteID":"1", 
    "nLanguageID":"1", 
    "nTopHeaderLogos":"top.header.logo",
    "nMenuUniqueName":"main.menu",
    "nHomeCarasoulBanner":"home.header.carousal.banner",
    "nHomeFeaturedContentBanners":"home.content.featured.banner",
    "nFooterSocialBanners":"footer.social",
    "nFooterDownloadApp":"download.app",
    "nHomeTopNewsCount":"1",
    "nHomeFeaturNewsCount":"20",
    "nHomeFeaturDoctorsCount":"3",
    "nHomeFeaturVideoCount":"4",
    "nFooterQuickLinks":"quick.links",
    "nFooterLinks":"footer.links",
    "nFooterDisclaimer":"disclaimer.message",
    "nPollUniquename":"what.you.think.about.our.website",
    "nHappinessUniqueName":"happiness.indicator"
  };
 
   
   return $resource( 'http://edoccms.graffitecs.com/Plugins/HomePage/HomePageDataService.svc/GetHomeData', {},{
    'get' : { method:'POST', headers: {"UsernameToken":"200ceb26807d6bf99fd6f4f0d1ca54d4",
    isArray:false,
    "PasswordToken":"382e0360e4eb7b70034fbaa69bec5786"}}
    }); 
    
    
 
  }]);


  app.directive('slickSlider', ['$timeout', function ($timeout) {
    
        return {
    
            restrict: 'A',
    
            //templateUrl: 'pages/home/SLIDER/_homeslider.html',
    
            link: function (scope, element, attrs) {   
    
                 $timeout(function(){  
    
                    var count = element.data('count');
    
                    var effect = element.data('fade');
    
                    var auto = element.data('autoplay');
    
                    var countxlg = element.data('countxlg');
    
                    var countlg = element.data('countlg');
    
                    var countnormal = element.data('countnormal');
    
                    var countsm = element.data('countsm');
    
                    var countmd = element.data('countmd');
                    var dots = element.data('dots');
    
                    element.slick({
                        lazyLoad: 'ondemand',
    
                        slidesToShow: count,
    
                        slidesToScroll: count,
    
                        autoplay: true,
    
                        infinite: true,
    
                        dots: dots,
    
                        fade: effect,
    
                        autoplaySpeed: 3000,
    
                        responsive: [
    
                             {
    
                                 breakpoint: 1920,
    
                                 settings: {
    
                                     slidesToShow: count,
    
                                     slidesToScroll: countlg
    
                                 }
    
                             },
    
                              {
    
                                  breakpoint: 1440,
    
                                  settings: {
    
                                      slidesToShow: countlg,
    
                                      slidesToScroll: countlg
    
                                  }
    
                              },
    
         {
    
             breakpoint: 1024,
    
             settings: {
    
                 slidesToShow: countmd,
    
                 slidesToScroll: countmd,
    
             }
    
         },
    
       {
    
           breakpoint: 600,
    
           settings: {
    
               slidesToShow: countmd,
    
               slidesToScroll: countmd
    
           }
    
       },
    
       {
    
           breakpoint: 480,
    
           settings: {
    
               slidesToShow: countsm,
    
               slidesToScroll: countsm
    
           }
    
       }
    
       // You can unslick at a given breakpoint now by adding:
    
       // settings: "unslick"
    
       // instead of a settings object
    
                        ]
    
                    });
    
    },2000) ;
    
            }
    
        };
    
    }]);