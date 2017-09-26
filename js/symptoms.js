app.controller('symptomcontroller', function ($scope, $stateParams) {
 
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


app.controller('malecontroller', function ($scope, $stateParams) {
    $scope.parts = $stateParams.parts;

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
});

app.controller('femalecontroller', function ($scope, $stateParams) {
    $scope.parts = $stateParams.parts;
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
});