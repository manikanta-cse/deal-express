/**
 * Created by kattamum on 8/1/2016.
 */
angular.module('techHungers.controllers')
  .controller('AccountCtrl', function ($scope, $http, $q, stateService, $ionicPopup) {
    var noop = {};

    $scope.mode = {view: 1, edit: 2};

    $scope.states = stateService.getStates();

    $scope.save = function (user) {
      if (window.localStorage.getItem('requestData')) {
        var requestData = JSON.parse(window.localStorage['requestData']);
        requestData.userInfo = user;
        window.localStorage.removeItem('requestData');
        window.localStorage['requestData'] = JSON.stringify(requestData);
      } else {
        window.localStorage['requestData'] = JSON.stringify({userInfo: user});
      }

      $ionicPopup.alert({
        title: 'Information',
        template: 'Data saved successfully!'
      }).then(function () {
        $scope.show($scope.mode.view);
      });
    };

    $scope.show = function (mode) {
      var user = getUserInfo();
      $scope.isView = (mode === $scope.mode.view);
      reloadUser(user);
    };

    $scope.onPlaceChanged = function (place) {
      $scope.user.address1 = place.street;
      $scope.user.city = place.city;
      $scope.user.state = place.state;
      $scope.user.county = place.county;
      $scope.user.zipCode = place.zipCode;
      $scope.user.zipCodeFour = place.zipCode4;
      $scope.$digest();
    };

    $scope.cancel = function () {
    // $scope.user = {};
      var data = getUserInfo();
      $scope.user = data == noop ? {} : data;
    };

    $scope.userExists = function () {
      return getUserInfo() !== noop;
    };

    var getUserInfo = function () {
      var user;
      if (window.localStorage['requestData']) {
        user = JSON.parse(window.localStorage['requestData']).userInfo;
      }
      return user || noop;
    };

    var reloadUser = function (user) {
      $scope.user = user;
    };


    //init
    $scope.show($scope.mode.edit);

  });
