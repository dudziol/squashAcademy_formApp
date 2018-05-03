var app = require("express")(),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser");

// APP CONFIG
mongoose.connect("mongodb://localhost/academyForm");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
	res.render("index");
})

app.listen(3000, function(){
	console.log("The server is running!");
})