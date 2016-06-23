
angular.module("PostsFactory", []).factory("posts", ["$http", "auth", ($http, auth) => {

  const Posts = {posts: []};

  Posts.getPosts = () => {
    return $http.get("/api/posts")
      .then(value => angular.copy(value.data, Posts.posts))
      .catch(err => console.error(err));
  };

  Posts.getPost = data => {
    return $http.get(`/api/posts/${data}`)
      .then(value => value.data)
      .catch(err => console.error(err));
  }

  Posts.createPost = data => {
    return $http.post("/api/posts", data, {
      headers: {Authorization: `Bearer ${auth.getToken()}`}
    }).then(value => Posts.posts.push(value.data))
      .catch(err => console.error(err));
  };

  Posts.upvotePost = data => {
    return $http.post(`/api/posts/${data._id}/upvote`, null, {
      headers: {Authorization: `Bearer ${auth.getToken()}`}
    }).then(value => data.upvotes++)
      .catch(err => console.error(err))
  };

  return Posts;

}]);
