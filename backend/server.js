require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require("./routes/user")

const app = express()

app.use(express.json())

app.use("/api/user", userRoutes)

mongoose
  .connect(process.env.Mong_URI)
  .then(() => {
    console.log("Connected to MongoDB")
    app.listen(process.env.PORT, () => {
      console.log("Listening for requests on port", process.env.PORT)
    })
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB")
    console.log(err)
  })
