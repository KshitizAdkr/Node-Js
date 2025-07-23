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
    catch(expression){
        throw{
            code: 500, message:"Mongodb server connection failed", status: "ERR_MONGODB_CONNECTION"
        }
    }
})();