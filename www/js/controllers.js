angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('ChatRoomCtrl', function($scope,$q,fireService){
  console.log("controller iniciado");



  var fireDB = fireService.fireDB;

  $scope.addGroup = function(grupo){
    console.log(grupo);
    var newPostKey = fireDB.ref('groups').push().key;
    var updates = {};
    updates[newPostKey] = {group:grupo};

    var post =  fireDB.ref('groups').update(updates).then(function(res){
      console.log(res);

    });

    $scope.loadGroups();
  }




  $scope.loadGroups = function(){
    var groups = fireDB.ref('groups').on("value",function(snapshot){
      console.log(snapshot.val());
      $scope.groupList = snapshot.val();
    });

  }




})
  .controller('chatCtrl',function($scope,$state,$stateParams,fireService){
    var fireDB = fireService.fireDB;
    $scope.chatList = {};


    fireDB.ref('groups/'+$stateParams.id+"/chat").on('value', function(data) {
      console.log(data.val());
      $scope.chatList = data.val();
    });


    $scope.send = function(){
      var msj = {
        nick:$scope.nick,
        message:$scope.message
      }
      console.log(msj);
      fireDB.ref('groups/'+$stateParams.id+"/chat").push().set(msj);

      $scope.message = '';

    }







  })
;
