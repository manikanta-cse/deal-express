angular.module('techHungers.services')
  .factory('vehicleSvc', function ($http) {

    var selectedVehicle;
    var imgServerUrl;

    var get = function (storeId, offset, limit, filters) {
      var url = "http://hackathon-inventory-api.azurewebsites.net/vehicles/";

      url += storeId + "/" + offset + "/" + limit;
      if (filters) url += "/" + filters;

      return $http.get(url);

    };

    return {
      get: get,
      selectedVehicle:selectedVehicle,
      imgServerUrl:imgServerUrl
    }
  });
