const app = require("./server")
const config = require("./config/dev.json")
const { MongoClient } = require("mongodb")


const PagesDAO = require("./controller")
const port = 1000

console.log("config: ", config.mongodb_uri);


MongoClient.connect(
    config.mongodb_uri,
    { writeConcern: { w: 1, wtimeout: 5000 }, useUnifiedTopology: true, wtimeout: 2500, useNewUrlParser: true }
  ).catch(err => {
    console.error(err.stack)
    process.exit(1)
  }).then(async client => {

    await PagesDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })


