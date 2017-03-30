angular.module('techHungers.controllers')
  .controller('VehicleCtrl', function ($scope, $state, vehicleSvc, storageSvc, $ionicScrollDelegate) {
    $scope.sttButton = false;
    $scope.vehicles = [];
    var storeId = "S000000109";
    var offset = 0;
    var pageSize = 10;

    $scope.doRefresh = function () {
      offset = 0;
      vehicleSvc.get(storeId, offset, pageSize)
        .then(bindData);
    };

    $scope.loadMore = function () {
      getVehicles();
      offset = parseInt(offset) + parseInt(pageSize);
    };

    var getVehicles = function () {
      vehicleSvc.get(storeId, offset, pageSize, $scope.search)
        .then(getSuccess, getFailure);
    };

    var getSuccess = function (response) {
      bindData(response);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    var getFailure = function (err) {
      $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    var bindData = function (response) {
      if (response.data && response.data.searchResult && response.data.searchResult.vehicles) {
        $scope.vehicles = $scope.vehicles.concat(response.data.searchResult.vehicles);
      }

      if (response.data && response.data.searchResult.summary) {
        $scope.imageServerURL = response.data.searchResult.summary.imageServerURL;
      }
      $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.onVehicleSelected = function (vehicle, imgServerUrl) {
      vehicleSvc.selectedVehicle = vehicle;
      vehicleSvc.imageServerUrl = imgServerUrl;
      $state.go('app.vehicleDetail');
    };

    $scope.onSearch = function () {
      offset = 0;
      $scope.vehicles = [];
      getVehicles();
    };

    $scope.clearSearch = function () {
      $scope.search = "";
      offset=0;
      $scope.vehicles=[];
      getVehicles();
    };

    $scope.scrollToTop = function () { //ng-click for back to top button
      $ionicScrollDelegate.scrollTop(true);
      $scope.sttButton = false;  //hide the button when reached top
    };

    $scope.getScrollPosition = function () {
      //monitor the scroll
      var moveData = $ionicScrollDelegate.getScrollPosition().top;
      // console.log(moveData);
      $scope.$apply(function () {
        if (moveData > 150) {
          $scope.sttButton = true;
        } else {
          $scope.sttButton = false;
        }
      }); //apply
    };  //getScrollPosition
  });
