import passport from "passport";
import User from "../models/User";

const Users = () => {

  const register = (req, res, next) => {
    const { first_name, last_name, email, username, password } = req.body;

    if(!username || !password) return res.status(400).json({message: 'Please fill out all fields'});

    const user = new User({ first_name, last_name, email, username, password });
    user._id = username;
    user.save(err => {
      if (err) return next(err);
      return res.json({token: user.generateJWT()})
    });
  };

  const login = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({message: 'Please fill out all fields'});

    const auth = passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (user) {
        return res.json({token: user.generateJWT()});
      } else {
        return res.json(info);
      }
    })

    return auth(req, res, next);
  };

  return { register, login };

};

export default Users;
