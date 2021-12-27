const { ObjectId } = require("bson")
//var ObjectId = require('mongodb').ObjectId; 
const db = require("./config/dev.json")
let got
const DEFAULT_SORT = [["date", -1]]

module.exports = class AuctionDAO {
    static async injectDB(conn) {
        if (got) {
            return
        }
        try {
            got = await conn.db("got").collection("battles")
            this.got = got // this is only for testing
          
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in auctionDAO: ${e}`,
            )
        }
    }

    static async saveRecords(data){
        console.log("got in insertmany: ", got);
        const saved = await got.insertMany(data);
        return saved;
    }

    static async getListOfBattles(){
        try{
            const list = got.aggregate([{$project:{name:1,_id:0}}]).toArray();
            return list;
        }catch(e){
            console.error(
                `Unable to establish a collection handle in this : ${e}`,
            );
        }
       
    }

    static async getCountOfBattels(){
        try{
            const list = await got.aggregate([{
                $count: "totalbattles"
              }]).toArray();
              console.log("list: ",list);
            return list;
        }catch(e){
            console.error(
                `Unable to establish a collection handle in this : ${e}`,
            );
        }
       
    }

    static async searchByName(term){
        console.log("in searchByName: ",term);
        try{
        const listing = await got.aggregate([
            {$match:{ "location": { $regex: new RegExp(term, "i") } }}
        ]).toArray()
        console.log("in searchByName listing: ",listing);

        return listing;
      }catch(e){
        console.error(
            `Unable to establish a collection handle in this : ${e}`,
        );
    }
  }

  static async getDetailsById(id){
    try{
        var o_id = new ObjectId(id);
        let query = [{$match:{_id:o_id}}];
        console.log("id is: ",query);

        const list = got.aggregate(query).toArray();
        return list;
    }catch(e){
        console.error(
            `Unable to establish a collection handle in this : ${e}`,
        );
    }
  }

  static async searchByTracker(king){
     try{
         var king = king.king;
         let query = [{$match:{$or:[{attacker_king:king},{defender_king:king}]}}];
         const list = got.aggregate(query).toArray();
         return list;
     }catch(e){
            console.error(
            `Unable to establish a collection handle in this : ${e}`,
        );
     }
  } 
}