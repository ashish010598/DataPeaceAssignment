var mongoose = require("mongoose");

// SCHEMA SETUP
var userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    company: String,
    city: String,
    state: String,
    zip: String,
    email: String,
    age: Number,
    website: String
});
module.exports = mongoose.model("user",userSchema);