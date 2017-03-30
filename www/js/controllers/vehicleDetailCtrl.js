angular.module('techHungers.controllers')
  .controller('VehicleDetailCtrl', function ($scope, $state, $rootScope, vehicleSvc, paymentSvc, storageSvc, paymentStructureSvc,$ionicScrollDelegate) {


    var init = function () {
      if (!vehicleSvc.selectedVehicle) $state.go('app.vehicles');
      $scope.vehicle = vehicleSvc.selectedVehicle;
      $scope.imageServerUrl = vehicleSvc.imageServerUrl;
      $scope.showFinance = true;
      getSuggestions();
    };

    $scope.togglePayment = function (val) {
      $scope.showFinance = false;
      $scope.showLease = false;
      $scope.showCash = false;
      if (val === 0) $scope.showFinance = true;
      else if (val == 1) $scope.showLease = true;
      else $scope.showCash = true;
    };

    $scope.onCalculate = function () {
      var data = {
        "storeInfo": {
          "storeID": "S000000109"
        },
        "dealType": "Finance",
        "terms": [36, 48, 60],
        "excessMileage": {
          "annualExpectedMileage": 15000
        }
      };

      $scope.showPaymentStructure=function(payment,dealType) {
        paymentStructureSvc.payment=payment;
        paymentStructureSvc.payment.dealType=dealType;

        $state.go('app.paymentStructure')
      };

      data.customer = getCustomerAddress();
      data.vehicle = getVehicle();

      $scope.calculating = true;
      $scope.payment = false;
      paymentSvc.calculate(data)
        .then(paymentSuccess, paymentFailure)
        .finally(final);

      var leasePayload = angular.copy(data);
      leasePayload.dealType = "Lease";
      paymentSvc.calculate(leasePayload)
        .then(function (response) {
          $scope.leasePayment = response.data;
        }, function (err) {
          console.log(err);
        });


      var cashPayload = angular.copy(data);
      cashPayload.dealType = "Cash";

      paymentSvc.calculate(cashPayload)
        .then(function (response) {
          $scope.cashPayment = response.data;
        }, function (err) {
          console.log(err);
        });
    };

    $scope.predicate=function(payment){
      return payment.term;
    };

    $scope.onVehicleSelected = function (vehicle) {
      vehicleSvc.selectedVehicle = vehicle;
      $ionicScrollDelegate.scrollTop(true);
      init();
    };

    var paymentSuccess = function (response) {
      $scope.financePayment = response.data;
    };

    var paymentFailure = function (err) {
      console.log(err);
    };

    var final = function () {
      $scope.calculating = false;
      $scope.payment = true;
    };

    var getCustomerAddress = function () {

      var localStorageData = storageSvc.getData();

      if (localStorageData && localStorageData.userInfo) {
        var user = localStorageData.userInfo;
        return {
          "address1": user.address1,
          "state": user.state,
          "city": user.city,
          "zipCode": user.zipCode,
          "customerCredit": {
            "creditStatus": user.creditStatus
          }
        };
      }
    };

    var getVehicle = function () {
      var vehicle=$scope.vehicle;
      if (vehicleSvc.selectedVehicle) {
        return {
          msrp: vehicle.prices?vehicle.prices[0].price.amount:0,
          sellingPrice:vehicle.prices? vehicle.prices[0].price.amount:0,
          "type": vehicle.preOwned ? "Used" : "New",
          "vin": vehicle.vin,
          "year": vehicle.year,
          "Make": vehicle.make.label,
          "Model": vehicle.model.label
        };
      }
    };

    var getSuggestions = function () {
      if ($scope.vehicle && $scope.vehicle.model) {
        $scope.serverURL = vehicleSvc.imageServerUrl;
        vehicleSvc.get("S000000109", 1, 2, $scope.vehicle.make.label)
          .then(function (response) {
            if (response && response.data && response.data.searchResult)
              $scope.suggestedVehicles = response.data.searchResult.vehicles;
          });
      }
    };


    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      if (fromState.name == 'app.vehicles') {
        init();
      }
    });
    init();

  });
