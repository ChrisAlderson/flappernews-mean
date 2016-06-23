import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  body: String,
  author: String,
  upvotes: {type: Number, default: 0},
  author: {type: String, ref: "User"},
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
});

CommentSchema.methods.upvote = function(callback) {
  this.upvotes++;
  return this.save(callback);
};

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment
