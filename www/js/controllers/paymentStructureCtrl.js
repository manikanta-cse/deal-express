angular.module('techHungers.controllers')
    .controller('paymentStructureCtrl', function($scope,paymentStructureSvc,$state,$rootScope) {

      $scope.getTotalFee = function(){
        var total = 0;
        for(var i = 0; i < $scope.paymentDetails.fees.length; i++){
          total += $scope.paymentDetails.fees[i].value;
        }
        return total;
      };

      $scope.getTotalTax = function(){
        var total = 0;
        for(var i = 0; i < $scope.paymentDetails.taxes.length; i++){
          total += $scope.paymentDetails.taxes[i].amount;
        }
        return total;
      };
      $scope.getTotalRebates = function(){
        var total = 0;
        for(var i = 0; i < $scope.paymentDetails.rebates.length; i++){
          total += $scope.paymentDetails.rebates[i].value;
        }
        return total;
      };

      $scope.hasItems = function(list){
        return list.length > 0;
      };


      $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
          $scope.shownGroup = null;
        } else {
          $scope.shownGroup = group;
        }
      };
      $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
      };


      $scope.makeaDeal=function()
      {
        $scope.showMsg=true;
      }

      var init=function(){
        if(!paymentStructureSvc.payment || !paymentStructureSvc.payment.cashPrice)$state.go('app.vehicles');
        $scope.paymentDetails = paymentStructureSvc.payment;
        $scope.creditStatus = window.localStorage['requestData'] && JSON.parse(window.localStorage['requestData']).userInfo ? JSON.parse(window.localStorage['requestData']).userInfo.customerCredit :'';
        $scope.storeName = window.localStorage['requestData'] && JSON.parse(window.localStorage['requestData']).storeInfo ? JSON.parse(window.localStorage['requestData']).storeInfo.storeName :'';
        $scope.showMsg=false;
      };

      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        if (fromState.name == 'app.vehicleDetail') {
          init();
        }
      });

      init();

  });
