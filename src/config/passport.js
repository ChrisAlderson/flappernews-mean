import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User";

const Passport = () => {

  passport.use(new LocalStrategy((username, password, callback) => {
    return User.findOne({ username }).then(user => {
      if (!user) return callback(null, false, {message: "Incorrect username."});

      user.verifyPassword(password, (err, isMatch) => {
        if (err) return callback(err);
        if (!isMatch) return callback(null, false);
        return callback(null, user);
      });
    }).catch(err => callbacK(err));
  }));

  const isAuthenticated = passport.authenticate(["local"], {session: false});

  return { isAuthenticated };

};

export default Passport;
