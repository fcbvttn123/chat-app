require("dotenv").config()
const express = require("express")

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.json({ propertyName: "Value" })
})

app.listen(process.env.PORT, () => {
  console.log("Listening for requests on port", process.env.PORT)
})
