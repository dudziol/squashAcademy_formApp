var express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser");

// APP CONFIG
mongoose.connect("mongodb://localhost/academyForm");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// MONGOOSE/MODEL/ CONFIG
var contactSchema = new mongoose.Schema({
	name: String,
	date: String,
	coach: Boolean,
	telephone: String,
	email: String,
	message: String
});
var Contact = mongoose.model("Contact", contactSchema);

// INDEX ROUTE
app.get("/", function(req, res){
	res.render("index");
})

// CREATE ROUTE
app.post("/", function(req, res){
	res.redirect("/");
})

// REDIRECT to INDEX
app.get("/:id", function(req, res){
	res.redirect("/");
})

app.listen(3000, function(){
	console.log("The server is running!");
})