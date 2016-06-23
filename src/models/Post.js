import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: String,
  link: String,
  upvotes: {
    type: Number,
    default: 0
  },
  author: {type: String, ref: "User"},
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
});

PostSchema.methods.upvote = function(callback) {
  this.upvotes++;
  return this.save(callback);
};

const Post = mongoose.model("Post", PostSchema);

export default Post;
