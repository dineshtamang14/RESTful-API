const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSechma = {
    title: String,
    content: String,
}

const Article = mongoose.model("Article", articleSechma);

// TODO GET ROUTE
app.get("/articles", function(req, res){
    Article.find(function(err, articleFound){
        if(!err){
            res.send(articleFound);
        } else {
            res.send(err);
        }
    }); 
});

// TODO POST ROUTE
app.post("/articles", function(req, res){
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content,
    });

    newArticle.save(function(err){
        if(!err){
            res.send("successfully added the new Article");
        } else {
            res.send(err);
        }
    });
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server is running on port 3000");
})
