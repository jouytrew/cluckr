const express = require('express');
const morgan = require('morgan');
var router = express.Router();

const app = express();

app.set("view engine", "ejs");
app.use(morgan("dev"));

router.get("/", (request, response) => {
  response.render("index", {
    title: "Index"
  })
});

router.get("/sign_in", (request, response) => {
  response.render("sign_in", {
    title: "Sign In"
  })
});

const COOKIE_MAX_AGE = 1000 * 3600 * 24 * 7;
router.post("/sign_in", (request, response) => {
  const username = request.body.username;
  response.cookie("username", username, {maxAge: COOKIE_MAX_AGE});
  response.redirect("/");
});

router.post("/sign_out", (request, response) => {
  response.clearCookie("username")
  response.redirect("/")
});

module.exports = router;
