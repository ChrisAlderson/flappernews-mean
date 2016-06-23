
angular.module("PostsController", []).controller("PostsCtrl", ["$scope", "posts", "auth", ($scope, posts, auth) => {
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.posts = posts.posts;

  $scope.addPost = () => {
    if (!$scope.title || $scope.title === "") return;
    const { title, link } = $scope;

    posts.createPost({ title, link });

    $scope.title = "";
    $scope.link = "";
  };

  $scope.incrementUpvotes = post => posts.upvotePost(post);

}]);
