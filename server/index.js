require("dotenv").config()
const connectToDb = require("./DbConfig/db")
const express = require('express');
const cors = require('cors')
//routers 
const authRouter = require("./Router/authRouter")
// const quoteRouter = require("./Router/qouteRouter")
//middleware
const errorMiddleware = require("./Middleware/errorMiddleware")
const app = express();
app.use(express.json())
app.use(cors())

app.use("/api/auth", authRouter)
// app.use("/api/quote", quoteRouter)

app.use(errorMiddleware)
connectToDb().then(()=>{
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
  })
})