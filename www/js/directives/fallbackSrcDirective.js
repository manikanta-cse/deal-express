/**
 * Created by kattamum on 8/3/2016.
 */
angular.module('techHungers.controllers').directive('fallbackSrc', function () {
  var fallbackSrc = {
    link: function postLink(scope, iElement, iAttrs) {
      iElement.bind('error', function() {
        angular.element(this).attr("src", iAttrs.fallbackSrc);
        angular.element(this).attr("height", "140");
        angular.element(this).attr("width", "140");
      });
    }
  }
  return fallbackSrc;
});
