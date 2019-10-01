'use strict';

const express = require('express'),
      mongo = require('mongodb'),
      mongoose = require('mongoose'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
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
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});


  
// your first API endpoint... 
app.get("/api/shorturl/:id", async  (req, res) => {

  const val = await isUrlValidAsync("www.google.com")
  res.json({greeting: 'hello API', url:val});
});

app.post("/api/shorturl/new", async (req,res)=>{
  const long = req.body.url, 
        isValid = await isUrlValidAsync(long);
 
  if(!isValid)
  {
    res.send({error:"invalid Url"})
    return;
  }
  
  var query = {long:long, short:{$gt:0}},
    update = { },
    options = { upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify:false };

  const model = await Url.findOneAndUpdate(query,update,options);
  console.log(model)
  if(model.short === -1)
  {  
    console.log("creating model")
    const seq = await UrlSeq.findOne();
    model.short = ++seq.inc;
    console.log(model)
    await Promise.all([seq.save(),model.save()])
  }
  else{
    console.log("model already in db")
  }

  res.send({orginal_url:model.long, short_url:model.short})
})


app.listen(port, function () {
  console.log('Node.js listening ...');
});


function isUrlValidAsync(url) {
  return new Promise((resolve,reject)=>{
    try{
      if(!url){
        console.log("Url is Empty !")
        resolve(false);
        return;
      }
      url = url.trim().replace(/https?:\/\//,"");
      dns.lookup(url,(err,address,familly)=>{
      if(err){
        console.log(err)
        resolve(false)
      }
      else{
        console.log(`Url can be resolve : [${url}] => [${address}]`)
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