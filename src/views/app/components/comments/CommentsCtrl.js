
angular.module("CommentsController", []).controller("CommentsCtrl", ["$scope", "comments", "post", "auth", ($scope, comments, post, auth) => {
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.post = post;

  $scope.addComment = () => {
    if($scope.body === "") return;

    comments.addComment(post._id, {
      body: $scope.body,
      author: "user",
    }).then(comment => $scope.post.comments.push(comment.data));

    $scope.body = "";
  };

  $scope.incrementUpvotes = comment => comments.upvoteComment(post, comment);

}]);
