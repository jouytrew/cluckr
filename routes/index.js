const express = require('express');
const morgan = require('morgan');
const knex = require("../db/index")
var router = express.Router();

const app = express();

let formatDate = (date) => {
  const secsPassed = Math.floor((new Date().getTime() - date) / 1000)
  if (secsPassed < 60) {
    return "Just now"
  }
  const minsPassed = Math.floor(secsPassed / 60)
  if (minsPassed < 60) {
    return `${minsPassed} minute${minsPassed > 1 ? "s" : ""} ago`
  }
  const hoursPassed = Math.floor(minsPassed / 60)
  if (hoursPassed < 24) {
    return `${hoursPassed} hour${hoursPassed > 1 ? "s" : ""} ago`
  }
  const daysPassed = Math.floor(hoursPassed / 24)
  if (daysPassed < 30) {
    return `${daysPassed} day${daysPassed > 1 ? "s" : ""} ago`
  }
  const monthsPassed = Math.floor(days / 30.4)
  if (months < 12) {
    return `${monthsPassed} month${monthsPassed > 1 ? "s" : ""} ago`
  }
  const yearsPassed = Math.floor(daysPassed / 365.25)
  return `${yearsPassed} year${yearsPassed > 1 ? "s" : ""} ago`
}

app.set("view engine", "ejs");
app.use(morgan("dev"));

router.get("/clucks", (request, response) => {
  response.redirect("/")
});

router.get("/", (request, response) => {
  knex
    .select("*")
    .from("clucks")
    .orderBy("created_at", "DESC")
    .then(
      posts => {
        response.render("index", { posts: posts, formatDate });
      }
    )
});

router.get("/sign_in", (request, response) => {
  response.render("sign_in", {
    title: "Sign In"
  })
});

router.get("/posting", (request, response) => {
  response.render("posting", {
    title: "Posting"
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

router.post("/post", (req, res) => {
  const content = req.body.content;
  const image_url = req.body.image_url;
  const username = req.cookies.username;
  if (content && username) {
    knex
      .insert({
        username: username,
        content: content,
        image_url: image_url
      })
      .into("clucks")
      .then(() => {
        res.redirect("/");
      });
  } else {
    res.redirect("/posting")
  }
});

module.exports = router;
