require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require("./routes/user")
const streamChatRoutes = require("./routes/streamChat")
const cors = require("cors")

const app = express()

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
)

app.use(express.json())

app.use("/api/auth", userRoutes)
app.use("/api/auth", streamChatRoutes)

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
