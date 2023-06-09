const express = require("express")
const cors = require('cors')
const app = express();
const {PORT} = require("./src/config")
const connect = require('./src/database/connect')
const errorHandler = require('./src/middleware/errorHandler')
const userRouter = require('./src/routes');
// const generateFakeData = require('./utils/fake.data') 
// Default Middleware
app.use(express.json());
app.use(cors())

app.use("/api",userRouter)

app.get("/",(req,res)=>{
    res.send("Working fine")
})
// registered error handler middleware
app.use(errorHandler)


//Connect to the database before listening
connect().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})