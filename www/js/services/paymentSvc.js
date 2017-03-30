angular.module('techHungers.services')
  .factory('paymentSvc', function ($http) {

    var calculate = function (data) {
      var url = "https://www-dev.adpedge.com/api/fo-quote-core-services/v1/api/services/public/calculatePayment";

      return $http.post(url,data);
    };

    return {
      calculate: calculate
    }
  });
