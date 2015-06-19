'use strict';
angular.module('app.controllers', [])

.controller('MainCtrl', function ($scope, $state, $http, $q) {
    console.log('MainCtrl');

    $scope.init = function () {
        $scope.page = 1;
        $scope.getImages()
        .then(function (res) {
            // success
            console.log('Images: ', res)
            $scope.imageList = res.shots;
        }, function (status) {
            // err
            $scope.pageError = status;
        })
    }

    $scope.setActive = function (index) {
        angular.forEach($scope.imageList, function (image) {
            image.active = false;
        })

        $scope.imageList[index].active = true
    }

    $scope.getImages = function () {
        var defer = $q.defer();

        $http.jsonp('http://api.dribbble.com/shots/everyone?page=' + $scope.page + '&callback=JSON_CALLBACK')
        .success(function (res) {
            defer.resolve(res)
        })
        .error(function (status, err) {
            defer.reject(status)
        })

        return defer.promise;
    }

    $scope.nextPage = function () {
        $scope.page += 1;

        $scope.getImages()
        .then(function (res) {
            if ($scope.imageList[0]) {
                $scope.imageList = $scope.imageList.concat(res.shots)
            }
            else {
                $scope.imageList = res.shots;
            }
            console.log('nextPage: ', $scope.imageList)
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    }

    $scope.init();

});
    
