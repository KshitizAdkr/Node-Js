const { MongodbConfig } = require("./config");

const mongoose = require("mongoose");

//IIFE (Immediately Invokable function expression)
(async() => {
    try{
       await mongoose.connect(MongodbConfig.url,{
        dbName: MongodbConfig.dbName,
        autoCreate: true,
        autoIndex: true,
       }) 
       console.log("**** Mongodb Server Connected Succesully... ****")
    }
    catch(exception) {
    console.log(exception)
    console.log("Mongodb server connection error.....")
    throw {code: 500, message: "Mongodb Server Connection failed..", status: "MONGO_CONNECTION_ERR"}
    // process.exit(1)
  }
})();