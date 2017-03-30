(function () {

  function googleAddressAutoComplete(googleApi) {
    return {
      restrict: 'A',
      scope: {
        onPlaceChanged: '&'
      },
      link: function (scope, element, attrs) {
        var google = googleApi.getApi();
        var options = {
          componentRestrictions: {country: 'US'}
        };
        var autoComplete = new google.maps.places.Autocomplete(element[0], options);
        google.maps.event.addListener(autoComplete, 'place_changed', function () {
          var place = autoComplete.getPlace();
          var googlePlace = googleApi.mapAddressFromGoogle(place);
          if (googlePlace) {
            scope.onPlaceChanged({place: googlePlace});
          }
        });
      }
    };
  }

  googleAddressAutoComplete.$inject = ['googleApi'];

  angular.module('techHungers.controllers')
    .directive('addressAutoComplete', googleAddressAutoComplete);
})();
