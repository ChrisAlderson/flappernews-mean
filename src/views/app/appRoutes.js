
angular.module("appRoutes", []).config(["$routeProvider", $routeProvider => {

  $routeProvider.when("/home", {
    templateUrl: "app/components/posts/posts.html",
    controller: "PostsCtrl",
    resolve: {
      postPromise: ["posts", posts => posts.getPosts()]
    }
  });

  $routeProvider.when("/posts/:id", {
    templateUrl: "app/components/comments/comments.html",
    controller: "CommentsCtrl",
    resolve: {
      post: ["$route", "posts", ($route, posts) => posts.getPost($route.current.params.id)]
    }
  });

  $routeProvider.when("/register", {
    templateUrl: "app/components/auth/register.html",
    controller: "AuthCtrl",
    onEnter: ["$location", "auth", ($location, auth) => {
      if (auth.isLoggedIn()) $location.path("/home");
    }]
  });

  $routeProvider.when("/login", {
    templateUrl: "app/components/auth/login.html",
    controller: "AuthCtrl",
    onEnter: ["$location", "auth", ($location, auth) => {
      if (auth.isLoggedIn()) $location.path("/home");
    }]
  });

  $routeProvider.otherwise({redirectTo: "/home"});

}]);
