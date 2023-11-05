//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent = "The beauty of literature";
const aboutContent = " I'm a web designer / developer based in Ethiopia, Addis Ababa. I have a passion for web design and love to create for web and mobile devices.";
const contactContent = "Contact me ";
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-yg:Yg%402023@cluster0.i1jaa60.mongodb.net/todolistDB");

const postSchema = {title: String, content: String};

const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {

  Post.find()
  .then(function (posts) {
    res.render("home", {homeStartingContent: homeStartingContent, posts: posts});
    })
  .catch(function (err) {
    console.log(err);
    });
});

app.get("/compose", (req, res) => {
  res.render("compose");
} );

app.post("/compose", (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  })
  post.save();
  res.redirect("/");
})

app.get("/post/:postId", (req, res) => {
  const requestedPostId = req.params.postId

  Post.findOne({ _id: requestedPostId})
    .then(function (post) {
        res.render("post", {title: post.title, content: post.content });
      })
      .catch(function (err) {
        console.log(err);
      });
});

app.get("/about", (req, res) => {
  res.render("about", {aboutContent: aboutContent});
} );

app.get("/contact", (req, res) => {
  res.render("contact", {contactContent: contactContent});
} );


let port = process.env.PORT;
if (port == null || port == ""){
  port = 3000;
}

app.listen(3000, function() {
  console.log("Server has started Successfully.");
});
