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

app.route("/articles")

    .get(
    // TODO GET ROUTE
    function(req, res){
        Article.find(function(err, articleFound){
            if(!err){
                res.send(articleFound);
            } else {
                res.send(err);
            }
        }); 
    }
)

    .post(
    // TODO POST ROUTE
    function(req, res){
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
    }
)
    
    .delete(
    //  TODO DELETE ROUTE 
    function(req, res){
        Article.deleteMany(function(err){
            if(!err){
                res.send("successfully delete the all articles.");
            } else {
                res.send(err);
            }
        });
    }
);


// TODO FOR SPECIFIC USER ROUTE
app.route("/articles/:articleTitle")
.get(function(req, res){
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
        if(foundArticle){
            res.send(foundArticle);
        } else {
            res.send("no article was found.");
        }
    });
})
.put(function(req, res){
    Article.findOneAndUpdate(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        {overwrite: true},
        function(err, result){
            if(!err){
                res.send("successfully updated the article.");
            }
    });
});


app.listen(process.env.PORT || 3000, ()=>{
    console.log("server is running on port 3000");
})
