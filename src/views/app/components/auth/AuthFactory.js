
angular.module("AuthFactory", []).factory("auth", ["$http", "$window", ($http, $window) => {

  const Auth = {};

  Auth.saveToken = token => $window.localStorage['flapper-news-token'] = token;
  Auth.getToken = () => $window.localStorage['flapper-news-token'];
  Auth.register = user => $http.post("/register", user).then(value => Auth.saveToken(value.data.token));
  Auth.logIn = user => $http.post("/login", user).then(value => Auth.saveToken(value.data.token));
  Auth.logOut = () => $window.localStorage.removeItem("flapper-news-token");

  Auth.isLoggedIn = () => {
    const token = Auth.getToken();
    if (token) {
      const payload = JSON.parse($window.atob(token.split(".")[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  Auth.currentUser = () => {
    if (Auth.isLoggedIn()) {
      const token = Auth.getToken();
      const payload = JSON.parse($window.atob(token.split(".")[1]));
      return payload.username;
    }
  };

  return Auth;

}]);
