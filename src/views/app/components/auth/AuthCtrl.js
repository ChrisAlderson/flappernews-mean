

angular.module("AuthController", []).controller("AuthCtrl", ["$scope", "$location", "auth", ($scope, $location, auth) => {

  $scope.user = {};

  $scope.register = () => {
    auth.register($scope.user)
      .then(() => $location.path("/home"))
      .catch(err => $scope.error = err);
  };

  $scope.logIn = () => {
    auth.logIn($scope.user)
      .then(() => $location.path("/home"))
      .catch(err => $scope.error = err);
  };

}]);
