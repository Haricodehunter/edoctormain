var app = angular.module('Edoctor', ['ui.router','ngResource','ui.bootstrap','angular-page-loader','EdoctorDir','wu.masonry','ngSanitize']);


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
          .state('healthtipsarticles', {
            url: '/articles/:id',
            templateUrl : 'pages/healthtipsinner.html',
            controller  : 'Healthtipsinnercontroller',
           
        })
        .state('news', {
          url: '/news',
          templateUrl : 'pages/news.html',
          controller  : 'Healthtipscontroller',
          label: 'Health Tips',
          data: {
            displayName: 'Health Tips',
        }
      
      })
      .state('newsarticles', {
        url: '/articles/:id',
        templateUrl : 'pages/newsinner.html',
        controller  : 'Healthtipsinnercontroller',
       
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
    
     if ( menu.SubMenu != null &&  menu.SubMenu.length < 1) {
         $scope.submenu = menu.SubMenu.length;
        $scope.dropdownlength = ($scope.submenu > 0) ? true : false;
      
     }
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
  var hdata = {
    "nLanguageID":"1",
    "nWebsiteID":"1",
    "nPageSize":"10",
    "nPageKey":"1",
    "nCategoryUniqueName":"articles"
};


var req = {
  method: 'POST',
  url: 'http://edoccms.graffitecs.com/Plugins/News/NewsService.svc/GetNewsListing',
  headers: {"UsernameToken":"200ceb26807d6bf99fd6f4f0d1ca54d4",
  "PasswordToken":"382e0360e4eb7b70034fbaa69bec5786"},
  data: hdata
 }
 
 $http(req).then(function successCallback(response){



  $rootScope.news = response.data.GetNewsListingResult.NewsArray;
  
  console.log($rootScope.news);

 
  }, function errorCallback(){

    console.log("unable fetch data");
  });


  var ehdata = {
    "nLanguageID":"1",
    "nWebsiteID":"1",
    "nCategoryUniqueName":"articles",
    "nCount":"5"
};
  var reeq = {
    method: 'POST',
    url: 'http://edoccms.graffitecs.com/Plugins/News/NewsService.svc/GetEditorPickArticles',
    headers: {"UsernameToken":"200ceb26807d6bf99fd6f4f0d1ca54d4",
    "PasswordToken":"382e0360e4eb7b70034fbaa69bec5786"},
    data: ehdata
   }
   
   $http(reeq).then(function successCallback(response){
  
  
  
    $rootScope.editornews = response.data.GetEditorPickArticlesResult.NewsArray;
    
    console.log($rootScope.editornews);
  
   
    }, function errorCallback(){
  
      console.log("unable fetch data");
    });


  $timeout(function() {
  $('.grid').masonry({
    // options
    itemSelector: '.grid-item',

  });
  },4000);

  $scope.datalists =  $rootScope.editornews; // json data
  
  //show more functionality
  
  var pagesShown = 1;
  
  var pageSize = 3;
  
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


});



app.controller('Healthtipsinnercontroller', function ($scope, $stateParams, $rootScope, $http, HomeService,$timeout) {

  var hdata = {
    "nID":$stateParams.id
};


var req = {
  method: 'POST',
  url: 'http://edoccms.graffitecs.com/Plugins/News/NewsService.svc/GetArticleByID',
  headers: {"UsernameToken":"200ceb26807d6bf99fd6f4f0d1ca54d4",
  "PasswordToken":"382e0360e4eb7b70034fbaa69bec5786"},
  data: hdata
 }
 
 $http(req).then(function successCallback(response){



  $rootScope.newssingle = response.data.GetArticleByIDResult.NewsArray[0];
  
  console.log($rootScope.newssingle);

 
  }, function errorCallback(){

    console.log("unable fetch data");
  });
  var relhdata = {
    "nLanguageID":"1",
    "nWebsiteID":"1",
    "nCount":"3",
    "nExcludedNewsID":$stateParams.id,
    "nCategoryUniqueName":"articles"
};


var relreq = {
  method: 'POST',
  url: 'http://edoccms.graffitecs.com/Plugins/News/NewsService.svc/GetRelatedArticles',
  headers: {"UsernameToken":"200ceb26807d6bf99fd6f4f0d1ca54d4",
  "PasswordToken":"382e0360e4eb7b70034fbaa69bec5786"},
  data: relhdata
 }
 
 $http(relreq).then(function successCallback(response){

  $rootScope.relnews = response.data.GetRelatedArticlesResult.NewsArray;
  
  console.log($rootScope.relnews);

 
  }, function errorCallback(){

    console.log("unable fetch related data");
  });

});


app.controller('newscontroller', function ($scope, $rootScope, $http, HomeService,$timeout) {
  var hdata = {
      "nLanguageID":"1",
      "nWebsiteID":"1",
      "nPageSize":"10",
      "nPageKey":"1",
      "nCategoryUniqueName":"news"
    };


var req = {
  method: 'POST',
  url: 'http://edoccms.graffitecs.com/Plugins/News/NewsService.svc/GetNewsListing',
  headers: {"UsernameToken":"200ceb26807d6bf99fd6f4f0d1ca54d4",
  "PasswordToken":"382e0360e4eb7b70034fbaa69bec5786"},
  data: hdata
 }
 
 $http(req).then(function successCallback(response){



  $rootScope.news = response.data.GetNewsListingResult.NewsArray;
  
  console.log($rootScope.news);

 
  }, function errorCallback(){

    console.log("unable fetch data");
  });


  var ehdata = {
    "nLanguageID":"1",
    "nWebsiteID":"1",
    "nCategoryUniqueName":"articles",
    "nCount":"5"
};
  var reeq = {
    method: 'POST',
    url: 'http://edoccms.graffitecs.com/Plugins/News/NewsService.svc/GetEditorPickArticles',
    headers: {"UsernameToken":"200ceb26807d6bf99fd6f4f0d1ca54d4",
    "PasswordToken":"382e0360e4eb7b70034fbaa69bec5786"},
    data: ehdata
   }
   
   $http(reeq).then(function successCallback(response){
  
  
  
    $rootScope.editornews = response.data.GetEditorPickArticlesResult.NewsArray;
    
    console.log($rootScope.editornews);
  
   
    }, function errorCallback(){
  
      console.log("unable fetch data");
    });


  $timeout(function() {
  $('.grid').masonry({
    // options
    itemSelector: '.grid-item',

  });
  },4000);

  $scope.datalists =  $rootScope.editornews; // json data
  
  //show more functionality
  
  var pagesShown = 1;
  
  var pageSize = 3;
  
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


});



app.controller('newsinnercontroller', function ($scope, $stateParams, $rootScope, $http, HomeService,$timeout) {

  var hdata = {
    "nID":$stateParams.id
};


var req = {
  method: 'POST',
  url: 'http://edoccms.graffitecs.com/Plugins/News/NewsService.svc/GetArticleByID',
  headers: {"UsernameToken":"200ceb26807d6bf99fd6f4f0d1ca54d4",
  "PasswordToken":"382e0360e4eb7b70034fbaa69bec5786"},
  data: hdata
 }
 
 $http(req).then(function successCallback(response){



  $rootScope.newssingle = response.data.GetArticleByIDResult.NewsArray[0];
  
  console.log($rootScope.newssingle);

 
  }, function errorCallback(){

    console.log("unable fetch data");
  });
  var relhdata = {
    "nLanguageID":"1",
    "nWebsiteID":"1",
    "nCount":"3",
    "nExcludedNewsID":$stateParams.id,
    "nCategoryUniqueName":"articles"
};


var relreq = {
  method: 'POST',
  url: 'http://edoccms.graffitecs.com/Plugins/News/NewsService.svc/GetRelatedArticles',
  headers: {"UsernameToken":"200ceb26807d6bf99fd6f4f0d1ca54d4",
  "PasswordToken":"382e0360e4eb7b70034fbaa69bec5786"},
  data: relhdata
 }
 
 $http(relreq).then(function successCallback(response){

  $rootScope.relnews = response.data.GetRelatedArticlesResult.NewsArray;
  
  console.log($rootScope.relnews);

 
  }, function errorCallback(){

    console.log("unable fetch related data");
  });

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


 