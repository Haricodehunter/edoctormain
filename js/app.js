var app = angular.module('myGallery', []);

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
