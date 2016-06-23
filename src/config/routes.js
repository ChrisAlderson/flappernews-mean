import jwt from "express-jwt";
import Comments from "../controllers/comments";
import Passport from "./passport";
import Posts from "../controllers/posts";
import Users from "../controllers/users";

const Routes = () => {

  const comments = Comments();
  const posts = Posts();
  const users = Users();

  const passport = Passport();

  const auth = jwt({secret: "SECRET", userProperty: "payload"});

  const routes = app => {
    app.get("/", (req, res) => res.render("index.ejs"));

    app.post("/register", users.register);
    app.post("/login", users.login);

    app.param("post", posts.preLoadPost);
    app.param("comment", comments.preLoadComment);

    app.get("/api/posts", posts.getPosts);
    app.get("/api/posts/:post", posts.getPost);
    app.post("/api/posts", auth, posts.createPost);
    app.post("/api/posts/:post/upvote", auth, posts.upvotePost);

    app.post("/posts/:post/comments", auth, comments.postComment);
    app.put("/posts/:post/comments/:comment/upvote", auth, comments.upvoteComment);
  };

  return { routes };

};

export default Routes;
