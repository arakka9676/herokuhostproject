var express = require('express');
var router = express.Router();
var bankmodel = require("../models/bank");
var transmodel = require('../models/transactions')
var bodyparser = require("body-parser");
const { InsufficientStorage } = require('http-errors');
var bank = bankmodel.find({});
var history = transmodel.find({});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).render('index', { title: 'Express' });
});

router.get('/allusers', function(req, res, next){
  bank.exec(function(err,data){
    if(err) throw err;
    res.status(200).render('allusers', {title: 'ALL USERS', records: data});
  });

});

router.get('/allusers/:id', function(req, res){
  bankmodel.findById(req.params.id, function(err,data){
    if(err){
      console.log(err);
    } else {
      res.status(200).render('user', {title:"user data", sender:data});
      
      
    }
  })
});
router.post('/allusers/:id', async(req, res)=>{

  let mydata = {
   receivername : req.body.receivername,
   amount : req.body.amount,
   sendername : req.body.sendername,
   senderbalance : req.body.senderbalance
  //  receiverbalance : req.body.receiverbalance
  }
console.log(mydata.sendername)
console.log(mydata.senderbalance)
console.log(mydata.receivername)
// console.log(receiverbalance)

var senderBalance = parseInt(mydata.senderbalance)
var Amount = parseInt(mydata.amount)


var receiverbal = await bankmodel.findOne({name: mydata.receivername});
// console.log(receiverbal)

var getb = receiverbal;
// console.log(getb.accbalance)
let receiverbalance = parseInt(getb.accbalance);
console.log(receiverbalance)

console.log(mydata.amount)
if(Amount <= 0){
bankmodel.findById(req.params.id, function(err,data){
  if(err){
    console.log(err);
  } else {
    res.render('user', {title:"user data", sender:data});
  }
})
}else if(senderBalance < Amount){
  bankmodel.findById(req.params.id, function(err,data){
    if(err){
      console.log(err);
    } else {
      res.render('user', {title:"user data", sender:data});
    }
  })
}else{
  var debitmoney = parseInt(senderBalance) - parseInt(Amount)
  console.log(debitmoney)
  var creditmoney = parseInt(receiverbalance) + parseInt(Amount)
  console.log(creditmoney)
  // var sendername: req.body.sendername
  // var receivername: req.body.receivername

  var transdetails = await new transmodel({
    sendername: req.body.sendername,
    receivername: req.body.receivername,
    amount: parseInt(req.body.amount),
    date: new Date()

  }).save(async(err,data)=>{
    if(err) throw err
    await console.log("successfully Inserted")
  });
  

   await bankmodel.findOneAndUpdate({name: mydata.sendername},{accbalance:debitmoney},(err)=>{
    if(err) throw err;
    console.log("sender Data updated Successfully")
  })
   await bankmodel.findOneAndUpdate({name: mydata.receivername},{accbalance:creditmoney},(err)=>{
    if(err) throw err;
    console.log("receiver Data updated Successfully")
  })
   bank.exec(function(err,data){
    if(err) throw err;
    res.status(200).render('allusers', {title: 'ALL USERS', records: data});
  });
};

});


router.get('/transfer', async(req, res, next)=>{
  console.log(history.exec())
  await history.exec(function(err,data){
    if(err) throw err;
    res.status(200).render('transfer', {title: 'ALL transfer', trans: data});
  });

});
 
module.exports= router;




