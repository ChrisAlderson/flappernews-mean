

angular.module("NavController", []).controller("NavCtrl", ["$scope", "auth", ($scope, auth) => {

  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;

}]);
