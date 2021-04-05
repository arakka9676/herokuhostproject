function transfer(){
  let btn = document.getElementById("transferbtn");
  let form = document.getElementById("form");
  if(form.style.display == 'none'){
      form.style.display = 'block';
  }
  else{
      form.style.display ='none';
  }
}
function sendmoney(){


var amt = parseInt(document.getElementById("amount").value)
console.log(amt)
var sb = parseInt(document.getElementById("senderbalance").innerHTML)
console.log(sb)


if(amt <= 0){
alert("Please Enter a valid Amount")
}else if(sb<amt){
alert("Not have Enough Credits to Transfer")

}else {
  alert("succesfull transfer")
}

// var debitamt = sb-amt;
// document.getElementById("senderbalance").innerHTML = debitamt
}