'use strict';

const express = require('express'),
      mongo = require('mongodb'),
      mongoose = require('mongoose'),
      cors = require('cors'),
      bodyparser = require('body-parser'),
      app = express(),
      {UrlModel} =  require('./UrlModel');

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGO_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
app.use(bodyparser.json())

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/shorturl/:id", function (req, res) {
  
  res.json({greeting: 'hello API'});
});

app.post("/api/shorturl/new",(req,res)=>{
  req.body.original_url
})


app.listen(port, function () {
  console.log('Node.js listening ...');
});