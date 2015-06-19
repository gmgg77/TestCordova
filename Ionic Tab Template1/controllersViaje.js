'use strict';
angular.module('app.controllersViaje', [])

.controller('ViajeCtrl', function ($scope, $state, $http, $q) {
    console.log('ViajeCtrl');

    $scope.init = function () {
        $scope.page = 1;
        $scope.getViajes()
        .then(function (res) {
            // success
            console.log('Viajes: ', res)
            $scope.viajeList = res.posts;
        }, function (status) {
            // err
            $scope.pageError = status;
        })
    }

    $scope.setActive = function (index) {
        angular.forEach($scope.viajeList, function (viaje) {
            viaje.active = false;
        })

        $scope.viajeList[index].active = true
    }

    $scope.getViajes = function () {
        var defer = $q.defer();
        //var url = "http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/posts?callback=JSON_CALLBACK";
        var url = "http://developer.rdssis.local/Sample/odata/TiposViajes?callback=JSON_CALLBACK";
        $http.jsonp(url)
            .success(function (res) {
                console.log(res);
                defer.resolve(res)
            })
            .error(function (status, err) {
                defer.reject(status)
            })

        return defer.promise;
    }   

    $scope.nextPage = function () {
        $scope.page += 1;

        $scope.getViajes()
        .then(function (res) {
            if ($scope.viajeList[0]) {
                $scope.viajeList = $scope.viajeList.concat(res.value)
            }
            else {
                $scope.viajeList = res.value;
            }
            console.log('nextPage: ', $scope.viajeList)
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    }

    $scope.init();

});