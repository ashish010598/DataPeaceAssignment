var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var User = require("./models/user");
var app = express();

mongoose.set('useUnifiedTopology',true);
mongoose.connect("mongodb+srv://ashish:ASHISH@0105@cluster0-opwzt.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true, useCreateIndex: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.get("/",function(req,res){
	User.find({},function(err, alluser){
	if(err){
		console.log("Error While showing User");
	}
	else{
		res.render("landing",{users: alluser});
	}	
	});	
});

app.post("/user",function(req,res){
	var fname = req.body.fname;
	var lname = req.body.lname;
	var company = req.body.company;
	var city = req.body.city;
	var state = req.body.state;
	var zip = req.body.zip;
	var email = req.body.email;
	var website = req.body.website;
	var age = req.body.age;
	var newuser = {fname: fname,lname: lname,company: company,city: city,state: state,zip: zip,email: email,website: website,age: age};
	User.create(newuser, function(err, newlyCreated){
		if(err){
			console.log("Error in Data entry");
		}
		else{
			console.log("Entry Successful");
		}
	});
});

app.get("/user/new",function(req,res){
	res.render("new")
});

app.get("/user/:id",function(req,res){
	User.findById(req.params.id, function(err,foundUser){
		if(err){
			console.log("Error in showing the landing page");
		}
		else{
			res.render("show", {user: foundUser});
		}
	});
	
});

app.listen(3000,function(req,res){
	console.log("DATA PEACE SERVER STARTED");
});