var app = angular.module('mainApp', []);
app.controller('loginCtrl', function($scope, $http, $location) {
    $scope.submit = function() {
        $http({
            method: 'POST',
            url: '/login',
            data: $.param($scope.user),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(data) {
            $location.path('/main')
        });
    }
});