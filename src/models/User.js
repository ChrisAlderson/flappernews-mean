import bcrypt from "bcrypt-nodejs"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  _id: {type: String, index: {unique: true}},
  first_name: String,
  last_name: String,
  email: {type: String, index: {unique: true}},
  username: {type: String,index: {unique: true}},
  password: String
});

UserSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      return next();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return callback(err);
    return callback(null, isMatch);
  });
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  const { _id, username } = this;

  return jwt.sign({
    _id, username,
    exp: parseInt(exp.getTime() / 1000),
  }, "SECRET");
};

const User = mongoose.model("User", UserSchema);

export default User;
