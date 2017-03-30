
var storageSvc=function($window){

  var getData=function(){
   var data= $window.localStorage["requestData"];
    if(data){
      return JSON.parse(window.localStorage['requestData']);
    }
  };

  return{
    getData:getData
  }
};


angular.module('techHungers.controllers')
  .service('storageSvc', storageSvc);
