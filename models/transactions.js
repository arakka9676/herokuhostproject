const express = require('express');
const mongoose = require("mongoose");
require('mongoose-type-url');
var validate = require('mongoose-validator')

mongoose.connect('mongodb://localhost/mybank', {useNewUrlParser: true, useUnifiedTopology: true});
 
var conn=mongoose.connection;

var transactionschema = new mongoose.Schema({
    sendername: String,
    receivername: String,
    amount: Number,
    date: String
});

var transmodel = mongoose.model('transactions', transactionschema)

module.exports = transmodel;