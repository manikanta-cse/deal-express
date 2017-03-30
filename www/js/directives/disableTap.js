angular.module('techHungers.controllers').directive('disableTap', function ($timeout) {
  return {
    link: function () {
      $timeout(function () {
        // Find google places div
        _.findIndex(angular.element(document.querySelectorAll('.pac-container')), function (container) {
          // disable ionic data tab
          container.setAttribute('data-tap-disabled', 'true');
          // leave input field if google-address-entry is selected
          container.onclick = function () {
            document.getElementById('autocomplete').blur();
          };
        });
      }, 500);
    }
  };
});
