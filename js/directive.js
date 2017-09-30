var app = angular.module('EdoctorDir', []);


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


