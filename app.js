const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})

const articleSchema = {
  title: String,
  content: String
}

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
// GET all articles
.get(function(req,res){
  Article.find(function(err,foundArticles){
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  })
})
// POST a new article
.post(function(req,res){
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  newArticle.save(function(err){
    if (err) {
      res.send(err);
    } else {
      res.send("Sucessfully added a new article.")
    }
  });
})

.delete(function(req, res){
  Article.deleteMany(function(err){
    if (err) {
      res.send(err);
    } else {
      res.send("Successfully deleted all the articles.")
    }
  })
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
