app.controller('symptomcontroller', function ($scope) {
 
    $scope.imgmale="img/malefront.png";
    $scope.imgfemale="img/femalefront.png";
    $scope.BackView = true;

    $scope.RotateImg = function(Gender, direction){
        $scope.BackView=!$scope.BackView;
        if(Gender=="male"){
            $scope.imgmale="img/male"+direction+".png"
          
           
        }else{
            $scope.imgfemale="img/female"+direction+".png"
            
        }
    }

});

