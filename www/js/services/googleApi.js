(function () {
  var googleApi = function ($window, $q) {
    function flattenAddressComponents(place, useLongName) {
      return place.address_components.reduce(function (result, component) {
        component.types.forEach(function (key) {
          result[key] = component[useLongName ? 'long_name' : 'short_name'];
        });

        return result;
      }, {});
    }

    return {
      getApi: function () {
        return $window.google;
      },
      mapAddressFromGoogle: function (place) {
        if (!place.address_components) {
          return;
        }

        var shortNames = flattenAddressComponents(place, false),
          longNames = flattenAddressComponents(place, true);

        return {
          street: (shortNames['street_number'] || '') + ' ' + (longNames['route'] || ''),
          city: longNames['locality'],
          county: shortNames['administrative_area_level_2'] || '',
          state: shortNames['administrative_area_level_1'],
          country: longNames['country'],
          zipCode: longNames['postal_code'],
          zipCode4: shortNames['postal_code_suffix']
        };
      }
    };
  };

  googleApi.$inject = ['$window', '$q'];

  angular.module('techHungers.controllers')
    .service('googleApi', googleApi);
})();
