var express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser");

// APP CONFIG
mongoose.connect("mongodb://localhost/academyForm");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// INDEX ROUTE
app.get("/", function(req, res){
	res.render("index");
})

// REDIRECT to INDEX
app.get("/:id", function(req, res){
	res.redirect("/");
})

app.listen(3000, function(){
	console.log("The server is running!");
})