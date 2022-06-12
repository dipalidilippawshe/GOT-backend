const express = require('express')
const bodyParser = require("body-parser")
const redis = require("redis")
const app = express()

const cors = require("cors")

var fs = require('fs');
var csv = require('csvtojson');
var async = require('async');
const REDIS_PORT = 6379

//const client= redis.createClient(REDIS_PORT);
const redisClient = redis.createClient({host:'127.0.0.1',port:REDIS_PORT});
redisClient.on('connect',() => {
 console.log('connected to redis successfully!');
})
redisClient.on('error',(error) => {
console.log('Redis connection error :', error);
})


 const get = async (req, res, next) => {
     let key = "books";
     await redisClient.connect();
     console.log("outiin...t",redisClient);
    
     redisClient.get(key, (error, data) => {
      console.log("I am in111 nexddt");
       if (error) {res.status(400).send(err);}
       if (data !== null){
        console.log("I am in nexddt");
        res.status(200).send(JSON.parse(data));
       } 
       else{
         console.log("I am in next");
        next();
       } 
      });
      console.log("out...t");
      next();
 }
//require fileshere
var dbcontoller = require("./controller");
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/getbooks',get,dbcontoller.getListooks);



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



module.exports = app