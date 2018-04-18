var express = require('express');
var app = express();
var mysql = require('mysql');
var request = require('request');
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

store = {}
store.accounts = []
var x=0;
var y=0;
var z=0;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var con = mysql.createConnection({
    user : "root",
	password : "raghav16",
	host : "localhost",
	database : "train_mgmt"
});

function handleDisconnect() {
 console.log('handleDisconnect()');
 con.destroy();
 
 con.connect(function(err) {
     if(err) {
 console.log(' Error when connecting to db  (DBERR001):', err);
 setTimeout(handleDisconnect, 900);
     }
 });
}

    
app.get("/",function(req,res){
    res.render("index");
}); 

app.get("/cancel", function(req,res){
    res.render("cancel");
});

app.get("/findtrain",function(req,res){
   res.render("find_train",{x:x, y:y, z:z}); 
});

app.post("/findtrain", function(req,res){
    var source = req.body.source;
    var dest = req.body.dest;
    var date1 = req.body.date1;
    x = {source:source, dest:dest, date1:date1};
    
    /*con.query('insert into sample set ?',x, function(err, result){
    if (err) throw err;
    }); */
    
    return res.redirect("/findtrain");
});


app.get("/book",function(req,res){
    res.render("book");
});

app.post("/book", function(req,res){
   var train_no = req.body.train_no;
    console.log(req.body.train_no)
    return res.redirect("/passenger")
});

app.get("/passenger",function(req,res){
    res.render("passenger");
});

app.post("/passenger", function(req,res){
    
    var pid = req.body.pid;
    var pname_first = req.body.pname_first;
    var pname_second = req.body.pname_second;
    var pemail = req.body.pemail;
    var pdob = req.body.pdob;
    var pgen = req.body.pgen;
    
    x = {pid:pid, pname_first:pname_first, pname_second:pname_second, pemail:pemail, pdob:pdob, pgen:pgen};
    
    con.query('insert into passenger set ?',x, function(err, result){
    if (err) throw err;
    });
    
    return res.redirect("/");
});

app.get("/cancel", function(req,res){
   res.render("cancel") 
});

app.post("/cancel", function(req,res){
    return res.redirect("/")
});

app.listen(3000, function(){
	console.log('server on 3000 running');
});