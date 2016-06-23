import Post from "../models/Post";

const Posts = () => {

  const preLoadPost = (req, res, next, id) => {
    return Post.findOne({_id: id}).then(post => {
        if (!post) return next(new Error(`Can't find post!`));
        req.post = post;
        return next();
      }).catch(err => res.json(err));
  };

  const getPosts = (req, res) => {
    Post.find((err, posts) => {
      if (err) return next(err);
      res.json(posts);
    });
  };

  const getPost = (req, res, next) => {
    req.post.populate("comments", (err, post) => {
      if (err)  return next(err);
      res.json(post);
    });
  };

  const createPost = (req, res, next) => {
    const post = new Post(req.body);
    post.author = req.payload.username;
    post.save((err, post) => {
      if (err) return next(err);
      return res.json(post);
    });
  };

  const upvotePost = (req, res, next) => {
    req.post.upvote((err, post) => {
      if (err) return next(err);
      return res.json(post);
    });
  };

  return { preLoadPost, getPosts, getPost, createPost, upvotePost };

};

export default Posts;
