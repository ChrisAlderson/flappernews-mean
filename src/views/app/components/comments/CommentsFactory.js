
angular.module("CommentsFactory", []).factory("comments", ["$http", "auth", ($http, auth) => {

  const Comments = {};

  Comments.addComment = (id, comment) => {
    return $http.post(`/posts/${id}/comments`, comment, {
      headers: {Authorization: `Bearer ${auth.getToken()}`}
    }).catch(err => console.error(err));
  }

  Comments.upvoteComment = (post, comment) => {
    return $http.put(`/posts/${post._id}/comments/${comment._id}/upvote`, null, {
      headers: {Authorization: `Bearer ${auth.getToken()}`}
    }).then(data => comment.upvotes++)
      .catch(err => console.error(err));
  };

  return Comments;

}]);
