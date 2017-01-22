//angular.module('starter.controllers', [])

app.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
/*
*
* Test Functions
*
*/
app.controller('EnrollCtrl', function($scope,$log,$state,$ionicPopup,$timeout,$ionicLoading,$cordovaCamera, $cordovaCapture) {
    $scope.doSomething = function(){
      $state.go("galleryhub");
    };

    $scope.modeldata = {
      'postImg':'',
      'postName':'',
      'backImg':''
    }
    $scope.capturegallery = function(){
      $log.warn("capturegallery");
      /*var options = {
          quality: 75,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 300,
          targetHeight: 300,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
          $scope.backImg = "data:image/jpeg;base64," + imageData;
          $scope.imgTaken1 = "data:image/jpeg;base64," + imageData;
          $scope.modeldata.postImg = "data:image/jpeg;base64," + imageData;
      }, function (err) {
          alert('can not load image');
      });*/
      $scope.imgTaken1 = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/TigerShroff.jpg/220px-TigerShroff.jpg";
      $scope.modeldata.postImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/TigerShroff.jpg/220px-TigerShroff.jpg";
    }

    $scope.capturecamera = function(){
      $log.warn("capturecamera");
      /*var options = {
          quality: 75,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 300,
          targetHeight: 300,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation:true
        };
       
      $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.backImg = "data:image/jpeg;base64," + imageData;
            $scope.imgTaken1 = "data:image/jpeg;base64," + imageData;
            $scope.modeldata.postImg = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            alert('can not load image');
      });*/
      $scope.imgTaken1 = "img/mike.png";
      $scope.modeldata.postImg = "img/mike.png";
    }

    $scope.enroll = function(){
      $ionicLoading.show({ template: '<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner>' });
      if($scope.modeldata.postImg == "" || $scope.modeldata.postImg == null || $scope.modeldata.postImg == undefined){
        $ionicLoading.hide();
         var myPopup = $ionicPopup.show({
            title: 'Image Required',
            subTitle: 'You have to capture your image',
            buttons: [
              { text: 'Cancel' },
              {
                text: '<b>OK</b>',
                type: 'button-positive',
                onTap: function(e) {
                  $log.error("Provide image");
                  $ionicLoading.hide();
                }
              }
            ]
          });
          myPopup.then(function(res) {
            $ionicLoading.hide();
            console.log('Tapped!');
          });

          $timeout(function() {
            $ionicLoading.hide();
             myPopup.close(); //close the popup after 3 seconds for some reason
          }, 3000);
        return false;
      }else if($scope.modeldata.postName == "" || $scope.modeldata.postName == null || $scope.modeldata.postName == undefined  ){
        $ionicLoading.hide();
         var myPopup = $ionicPopup.show({
            title: 'Name Required',
            subTitle: 'You have to give your good name',
            buttons: [
              { text: 'Cancel' },
              {
                text: '<b>OK</b>',
                type: 'button-positive',
                onTap: function(e) {
                  $log.error("Provide name");
                  $ionicLoading.hide();
                }
              }
            ]
          });
          myPopup.then(function(res) {
            $ionicLoading.hide();
            console.log('Tapped!');
          });

          $timeout(function() {
            $ionicLoading.hide();
             myPopup.close(); //close the popup after 3 seconds for some reason
          }, 3000);
        return false;
      }
      $log.log("enroll "+$scope.modeldata.postName+" & "+$scope.modeldata.postImg+" dd");
      /*$timeout(function(){
        $ionicLoading.hide();
        $scope.modeldata.postImg = '';
        $scope.modeldata.postName = '';
        angular.element(document.getElementById("postName")).empty();
        $log.log("EnrollCtrl "+$scope.modeldata.postName+" & "+$scope.modeldata.postImg+" dd");
        $scope.imgTaken1 = 'img/user.png';
      },5000);*/
      var subjectName = $scope.modeldata.postName+"-"+"E00001"+"-"+_.random(100000,999999).toString(); //register first
      var request = new XMLHttpRequest();
      request.open('POST', 'https://api.kairos.com/enroll');
      request.setRequestHeader('Content-Type', 'application/json');
      request.setRequestHeader('app_id', '330e2c9a');
      request.setRequestHeader('app_key', 'ca35d2b93de4c71a1d9ea88980abfdc6');
      request.onreadystatechange = function () {
        $ionicLoading.hide();
        if (this.readyState === 4) {
          console.log('Status:', this.status);
          console.log('Headers:', this.getAllResponseHeaders());
          console.log('Body:', this.responseText);
          var po = JSON.parse(this.responseText);
          var err = JSON.stringify(this.responseText);

          $scope.modeldata.postImg = '';
          $scope.modeldata.postName = '';
          angular.element(document.getElementById("postName")).empty();
          $log.log("EnrollCtrl "+$scope.modeldata.postName+" & "+$scope.modeldata.postImg+" dd");
          $scope.imgTaken1 = 'img/user.png';

          angular.forEach(po,function(value,key){
              if(key == "images"){
                alert("Face Uploaded!!! matched, value is:"+po.images[0].transaction.confidence+" for subject  "+po.images[0].transaction.subject_id);
              }else if(key == "Errors"){
                alert(po.Errors[0].Message);
              }else{
                alert(po.Errors[0].Message);
              }
            });
        }
      };

      var body = {
        'image': $scope.modeldata.postImg,
        'subject_id': subjectName,
        'gallery_name': 'MyGallery'
      };

      request.send(JSON.stringify(body));
    }
})

.controller('RecognizeCtrl', function($scope,$log,$state,$ionicPopup,$timeout,$http,$ionicLoading,$cordovaCamera, $cordovaCapture) {
    $scope.doSomething = function(){
      $state.go("galleryhub");
    };

    $scope.modeldata = {
      'postImg':'',
      'backImg':''
    }
    $scope.capturegallery = function(){
      $log.warn("capturegallery");
      /*var options = {
          quality: 75,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 300,
          targetHeight: 300,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
          $scope.backImg = "data:image/jpeg;base64," + imageData;
          $scope.imgTaken2 = "data:image/jpeg;base64," + imageData;
          $scope.modeldata.postImg = "data:image/jpeg;base64," + imageData;
      }, function (err) {
          alert('can not load image');
      });*/
      $scope.imgTaken2 = "http://www.medictips.com/wp-content/uploads/2016/04/tiger-shroff-fitness-mantra-and-workout-routine.png";
      $scope.modeldata.postImg = "http://www.medictips.com/wp-content/uploads/2016/04/tiger-shroff-fitness-mantra-and-workout-routine.png";
    }

    $scope.capturecamera = function(){
      $log.warn("capturecamera");
      /*var options = {
          quality: 75,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 300,
          targetHeight: 300,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation:true
        };
       
      $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.backImg = "data:image/jpeg;base64," + imageData;
            $scope.imgTaken2 = "data:image/jpeg;base64," + imageData;
            $scope.modeldata.postImg = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            alert('can not load image');
      });*/
      $scope.imgTaken2 = "http://i.ndtvimg.com/i/2015-07/abhishek-bachchan_640x480_71435832454.jpg";
      $scope.modeldata.postImg = "http://i.ndtvimg.com/i/2015-07/abhishek-bachchan_640x480_71435832454.jpg";
    }

    $scope.recognize = function(){
      $ionicLoading.show({ template: '<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner>' });
      if($scope.modeldata.postImg == "" || $scope.modeldata.postImg == null || $scope.modeldata.postImg == undefined){
         $ionicLoading.hide();
         var myPopup = $ionicPopup.show({
            title: 'Image Required',
            subTitle: 'You have to capture your Image',
            buttons: [
              { text: 'Cancel' },
              {
                text: '<b>OK</b>',
                type: 'button-positive',
                onTap: function(e) {
                  $ionicLoading.hide();
                  $log.error("Provide image");
                }
              }
            ]
          });
          myPopup.then(function(res) {
            $ionicLoading.hide();
            console.log('Tapped!');
          });

          $timeout(function() {
            $ionicLoading.hide();
             myPopup.close(); //close the popup after 3 seconds for some reason
          }, 3000);
        return false;
      }
      $log.log("RecognizeCtrl "+$scope.modeldata.postImg+" dd");
      /*$timeout(function(){
        $ionicLoading.hide();
        $scope.modeldata.postImg = '';
        $log.log("RecognizeCtrl "+$scope.modeldata.postImg+" dd");
        $scope.imgTaken2 = 'img/user2.png';
      },5000);*/
      var request = new XMLHttpRequest();
      request.open('POST', 'https://api.kairos.com/recognize');
      request.setRequestHeader('Content-Type', 'application/json');
      request.setRequestHeader('app_id', '330e2c9a');
      request.setRequestHeader('app_key', 'ca35d2b93de4c71a1d9ea88980abfdc6');

      request.onreadystatechange = function (data) {
        $ionicLoading.hide();
        if (this.readyState === 4) {
          console.log('Status:', this.status);
          console.log('Headers:', this.getAllResponseHeaders());
          console.log('Body:', this.responseText);
          var re = JSON.parse(this.responseText);
          var err = JSON.parse(this.responseText);
          var msg = "success";

          $scope.modeldata.postImg = '';
          $log.log("done RecognizeCtrl "+$scope.modeldata.postImg+" dd");
          $scope.imgTaken2 = 'img/user2.png';
          //console.log(re.length);
          angular.forEach(re,function(value,key){
            if(key == "images"){
              if(re.images[0].transaction.confidence <= 0.63 && re.images[0].transaction.status == "success"){
                alert("Not matched, value is:"+re.images[0].transaction.confidence);
              }else if(re.images[0].transaction.status == "failure"){
                alert("Sorry You Unauthentified, Server Says:"+re.images[0].transaction.message);
              }else{
                var name = re.images[0].transaction.subject_id;
                var getName = name.split('-');
                alert("Congoo!!! Matched, Your name is:"+getName[0]+" & confidence value is "+re.images[0].transaction.confidence);
              }
            }else if(key == "Errors"){
              alert(re.Errors[0].Message);
            }else{
              alert(re.Errors[0].Message);
            }
          });
        }
      };

      var body = {
        'image': $scope.modeldata.postImg,
        'gallery_name': 'MyGallery',
        'threshold':'0.63'
      };
      request.send(JSON.stringify(body));
    }
})
 
.controller('HubCtrl',function($scope,$state,$ionicLoading,$timeout){
  console.log('HubCtrl');
  $scope.callface = function(){
    //gallery
    $ionicLoading.show({ template: '<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner>' });
    var request = new XMLHttpRequest();
    request.open('POST', 'https://api.kairos.com/gallery/list_all');
    request.setRequestHeader('app_id', '330e2c9a');
    request.setRequestHeader('app_key', 'ca35d2b93de4c71a1d9ea88980abfdc6');
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
        $ionicLoading.hide();
        var response = JSON.parse(this.responseText);
        alert(this.responseText);
        angular.forEach(response,function(value,key){
          if(key == "Errors"){
            console.log(response.Errors[0].Message);
            alert(response.Errors[0].Message);
            $scope.gallery_ids = '';//response.Errors[0].Message;
          }else{
            if(response.status == "Complete"){
              $scope.gallery_ids = response.gallery_ids;
            }else{
              alert('gallery not found');
              $scope.gallery_ids = '';
            }
          }
        });
      }
    };
    request.send();
  };


  $scope.doSomething = function(){
    console.log("1");
    $state.go("tab.Enroll");
    console.log("2");
  };
  $scope.gallery_ids = '';
  $scope.subjects = '';
  

  $scope.callSubjects = function(gallery){
    $ionicLoading.show({ template: 'Loading... '+gallery });
    $timeout(function() {
      var request = new XMLHttpRequest();
      request.open('POST', 'https://api.kairos.com/gallery/view');
      request.setRequestHeader('Content-Type', 'application/json');
      request.setRequestHeader('app_id', '330e2c9a');
      request.setRequestHeader('app_key', 'ca35d2b93de4c71a1d9ea88980abfdc6');
      request.onreadystatechange = function () {
        $ionicLoading.hide();
        if (this.readyState === 4) {
          console.log('Status:', this.status);
          console.log('Headers:', this.getAllResponseHeaders());
          console.log('Body:', this.responseText);
          var response = JSON.parse(this.responseText);
          angular.forEach(response,function(value,key){
            if(key == "Errors"){
              console.log(response.Errors[0].Message);
              alert(response.Errors[0].Message);
              $scope.subjects = '';//response.Errors[0].Message;
            }else{
              if(response.status == "Complete"){
                $scope.galle = gallery;
                $scope.subjects = response.subject_ids;
              }else{
                alert('subject_ids not found');
                $scope.subjects = '';
              }
            }
          });
        }
      };
      var body = {
        'gallery_name': gallery
      };
      request.send(JSON.stringify(body));
    }, 1000);      
  }  
  
});
