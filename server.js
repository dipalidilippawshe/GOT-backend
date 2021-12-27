const express = require('express')
const bodyParser = require("body-parser")
const app = express()

const cors = require("cors")

var fs = require('fs');
var csv = require('csvtojson');
var async = require('async');

//require fileshere
var dbcontoller = require("./controller");
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//reading CSv file here
app.post('/readcsv',async(req,res)=>{
  var inputFile='battles.csv';
  let respArr =[];
  csv()
.fromFile(inputFile)
.then(async(jsonObj)=> {
   // console.log(jsonObj);
   const saved = await dbcontoller.saveRecords(jsonObj);
   res.send({status:true, data: saved});
   
})
});

app.get('/getbattles',async (req,res)=>{

  const battles = await dbcontoller.getListOfBattles();
  if(battles){
     var response =[];
     battles.map(a=>{
       response.push(a.name);
     })
     res.send({status:true, data: response});

  }else{
    res.send({status:false, data:null})
  }
});
app.get('/getcount',async (req,res)=>{

  const battles = await dbcontoller.getCountOfBattels();
  if(battles){
     
     res.send({status:true, data: battles});

  }else{
    res.send({status:false, data:null})
  }
});

app.get('/search/:name',async (req,res)=>{

  const battles = await dbcontoller.searchByName(req.params.name);
  if(battles){
    res.send({status:true, data: battles});
  }else{
    res.send({status:false, data:null})
  }
});
app.get('/getdetail/:id',async(req,res)=>{
  const battle = await dbcontoller.getDetailsById(req.params.id);
  if(battle){
    res.send({status:true, data: battle});
  }else{
    res.send({status:false, data:null})
  }
});

app.get('/searchbyattacker',async(req,res)=>{
  //req query
  var query  = req.query;
  console.log("req.query : ",req.query);
  const battles = await dbcontoller.searchByTracker(query);
  if(battles){
    res.send({status:true, data: battles});
  }else{
    res.send({status:false, data:null})
  }
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



module.exports = app