const http = require("http")
const app = require("./src/config/express-config") //importing express config file

const httpServer = http.createServer(app) //create http server using express app

const PORT = 9020//Port numbers  ranges = 0 to 65535 ,use to 9-11k ,not more than that
const HOST = "localhost"   //either configure domain or localhost //ipconfig on terminal = take ipv4 =  192.168.101.140

//listen
//http://localhost:9020
httpServer.listen(PORT, HOST, (err ) => {
    if(!err) {
        console.log("Server is running port" +PORT)
        console.log("Press CTRL+C to disconnect server ....")
    }
})

// ok