import Comment from "../models/Comment";

const Comments = () => {

  const preLoadComment = (req, res, next, id) => {
    return Comment.findById(id)
      .then(comment => {
        if (!comment) return next(comment);
        req.comment = comment;
        return next();
      }).catch(err => next(err))
  };

  const postComment = (req, res, next) => {
    const comment = new Comment(req.body);
    comment.post = req.post;
    comment.author = req.payload.username;

    comment.save((err, comment) =>{
      if (err) return next(err);
      req.post.comments.push(comment);

      req.post.save((err, post) => {
        if (err) return next(err);
        res.json(comment);
      });
    });
  };

  const upvoteComment = (req, res, next) => {
    req.comment.upvote((err, post) => {
      if (err) return next(err);
      return res.json(post);
    });
  };

  return { preLoadComment, postComment, upvoteComment };

};

export default Comments;
