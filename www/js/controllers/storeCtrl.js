angular.module('techHungers.controllers')
  .controller('storeCtrl', function($scope) {
        $scope.stores=[{
                      id: 'S000000109',
                      name: 'Excellence Motor',
                      address: {
                        streetAddress: '12 Main Street',
                        city: 'Boston',
                        state: 'MASSACHUSETTS',
                        county: null,
                        postalCode: '02129-3709',
                        stateCode: 'MA'
                    }
                  },{
                    id: 'S000000100',
                    name: 'Excellence Motor CHEV Boston',
                    address: {
                      streetAddress: '12 TEST',
                      city: 'Cambridge',
                      state: 'MASSACHUSETTS',
                      county: null,
                      postalCode: '02139-4301',
                      stateCode: 'MA'
                    }
                  }
                ];

    $scope.selectStore = function(storeId,storeName){
      if(window.localStorage['requestData'])
      {
        var data=JSON.parse(window.localStorage['requestData']);
        data.storeInfo= {'storeID':storeId,'storeName':storeName};
        window.localStorage.removeItem('requestData');
        window.localStorage['requestData']=JSON.stringify(data);
      }
      else
      {
        window.localStorage['requestData']=JSON.stringify({'storeInfo':{'storeID':storeId,'storeName':storeName}});
      }
    };

    (function(){
      var storeId,storeName;
      if(window.localStorage['requestData'])
      {
        var data=JSON.parse(window.localStorage['requestData']);
        storeId = data.storeInfo ? data.storeInfo.storeID : $scope.stores[0].id;
      }
      else
      {
        storeId = $scope.stores[0].id;
        storeName = $scope.stores[0].name;
        window.localStorage['requestData']=JSON.stringify({'storeInfo':{'storeID':storeId,'storeName':storeName}});
      }

      for(var i=0;i<$scope.stores.length;i++)
      {
        if($scope.stores[i].id===storeId)
        {
          $scope.stores[i].selectedStore=storeId;
          return;
        }
      }

    }());

  });
