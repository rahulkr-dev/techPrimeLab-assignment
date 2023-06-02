const express = require("express")
const cors = require('cors')
const app = express();
const {PORT} = require("./config")
const connect = require('./database/connect')
const errorHandler = require('./middleware/errorHandler')
const userRouter = require('./routes')
// Default Middleware
app.use(express.json());
app.use(cors())

app.use("/api",userRouter)

app.get("/",(req,res)=>{
    res.send("Working fine")
})
// registered error handler middleware
app.use(errorHandler)


app.listen(PORT,async()=>{
    await connect()
    console.log("listening on",PORT)
})