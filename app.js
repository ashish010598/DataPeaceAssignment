var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var User = require("./models/user");
var app = express();

mongoose.set('useUnifiedTopology',true);
mongoose.connect("mongodb://localhost/users",{useNewUrlParser:true});

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