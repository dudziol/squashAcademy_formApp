var express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	expressSanitizer = require("express-sanitizer"),
	dotENV = require('dotenv'),
	nodemailer = require('nodemailer')
	smtpTransport = require('nodemailer-smtp-transport');

// APP CONFIG
dotENV.config();
mongoose.connect("mongodb://localhost/academyForm");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(expressSanitizer());

// NODEMAILER CONFIG
var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.MAIL_U,
    pass: process.env.MAIL_PASSWORD
  },
  tls: {
     rejectUnauthorized: false
    }
}));

// MONGOOSE/MODEL/ CONFIG
var contactSchema = new mongoose.Schema({
	name: String,
	date: String,
	coach: String,
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
	req.body.contact.body = req.sanitize(req.body.contact.body);
	Contact.create(req.body.contact, function(err, newContact){
		if(err){
			res.render("index");
		} else {
			let helperOptions = {
				from: 'squashacademy.trening@gmail.com',
				to: ,
				subject: ,
				text: 
			};
			transporter.sendMail(helperOptions, function(error, info){
				if(error){
					return console.log(error);
				} else{
					console.log("The message was sent");
				}
			});
			res.redirect("/");
		};
	});
});

// REDIRECT to INDEX
app.get("/:id", function(req, res){
	res.redirect("/");
})

app.listen(3000, function(){
	console.log("The server is running!");
})