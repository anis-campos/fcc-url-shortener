'use strict';

const express = require('express'),
      mongo = require('mongodb'),
      mongoose = require('mongoose'),
      cors = require('cors'),
      bodyparser = require('body-parser'),
      app = express(),
      dns = require('dns'),
      {Url,UrlSeq} =  require('./models');

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGO_URI,async (err)=>{
  if(err){
    console.log(err)
  }else if(await UrlSeq.count()==0){
      console.log("Init Db")
      UrlSeq.create({inc:0});
    }
});

app.use(cors());

/** this project needs to parse POST bodies **/
app.use(bodyparser.json())

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

function lookupAsync(url) {
  return new Promise((resolve,reject)=>{
    try{
      dns.lookup(url,(err,address,familly)=>{
      if(err){
        console.log(err)
        resolve(false)
      }
      else{
        resolve(true)
      }
    })
    }
    catch(ex){
      console.log(ex)
      resolve(false)
    }
  })
} 
  
// your first API endpoint... 
app.get("/api/shorturl/:id", async  (req, res) => {

  const val = await lookupAsync("www.google.com")
  res.json({greeting: 'hello API', url:val});
});

app.post("/api/shorturl/new", async (req,res)=>{
  const long = req.body.original_url;

  await dns.lookup(long)
  const seq = await UrlSeq.findOne();
  console.log(seq);
  
  
})


app.listen(port, function () {
  console.log('Node.js listening ...');
});