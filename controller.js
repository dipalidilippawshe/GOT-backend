const { ObjectId } = require("bson")
const cli = require("nodemon/lib/cli")
const redis = require("redis")
//var ObjectId = require('mongodb').ObjectId; 
const db = require("./config/dev.json")
let books
const DEFAULT_SORT = [["date", -1]]
const REDIS_PORT = 6379

const client= redis.createClient(REDIS_PORT);

module.exports = class AuctionDAO {
    static async injectDB(conn) {
        if (books) {
            return
        }
        try {
            books = await conn.db("mzallo").collection("books")
            
          
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in auctionDAO: ${e}`,
            )
        }
    }


  static async getListooks(req,res,next){
      // get(req,res,next);
       const page = req.query.page ? parseInt(req.query.page):1;
       var skip = (page-1)*10;
    try{
        const list = await books.find({}).skip(skip).limit(10).toArray();

        const bookList = {books:list, page:page};
        await client.connect();
        
        client.SETEX("books",1800, JSON.stringify(bookList));
        client.quit();
        return res.status(200).json(bookList);
    }catch(e){
        console.error(
            `Unable to establish a collection handle in this : ${e}`,
        );
    }
  }
}