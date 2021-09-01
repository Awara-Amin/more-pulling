//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts = [];


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/posts/:postName", function(req, res){
  // chl16*
  // console.log(req.params.postName);
  //chl17*
  // const requestedTitle = req.params.postName;
  // chl 18*
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach (function(xxa){
    const storedTitle = _.lowerCase(xxa.title);
    if (storedTitle === requestedTitle){
      // console.log("Match found");

        // chal19* becuase we are still in the forEach so we can say like that
        res.render("post", {
          boxTitle:xxa.title,
          postTitle:xxa.textContent

        });

     } //else {
      // console.log("Match not found");
    // }
  });
});


// ch1*
app.get("/", function (req, res){
  // ch1*
  // res.render("home");

  // ch2*
  res.render("home", {
    startingContent: homeStartingContent,
    // chl12*2
    test: posts
  });

  // chl12*1 delete this
  // ch11*3
   // console.log(posts);
});


// ch5* 1
app.get("/about", function (req, res){

  res.render("about", {
    aboutContent_1:aboutContent
  });
});

// ch5* 4
app.get("/contact", function (req, res){

  res.render("contact", {
    contactContent_1:contactContent
  });
});

// ch7* 2
app.get("/compose", function (req, res){
  // we dont pass over any data to this page.
  res.render("compose");
});


app.post("/compose", function (req, res){

// chl10* creating objects
  const post = {
  // i had used var   she said is alright too
    title:req.body.newSam,
    textContent: req.body.newSam_1
  };

  // chl1*1 (my way)
    // posts.push(post.title);
    // posts.push(post.textContent);

   // chl12*1 stoped logging here
   // chl11*1 her way
    posts.push(post);

   // console.log(posts);
   // res.send(posts);

    // chl1*2
   res.redirect("/");

  // let added = req.body.newSam;
  // let added_1 = req.body.newSam_1;
  // console.log(post.title, post.textContent);
});











app.listen(3000, function() {
  console.log("Server started on port 3000");
});
