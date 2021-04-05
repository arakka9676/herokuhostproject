const express = require('express');
const mongoose = require("mongoose");
require('mongoose-type-url');
var validate = require('mongoose-validator')

mongoose.connect('mongodb://localhost/mybank', {useNewUrlParser: true, useUnifiedTopology: true});
 
var conn=mongoose.connection;

var bankschema = new mongoose.Schema({
    name: String,
    email: String,
    accbalance: Number,
    city: String,
    
    
});

var info = mongoose.model('users', bankschema);

module.exports = info;