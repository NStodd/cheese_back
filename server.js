// DEPENDENCIES

require ("dotenv").config()
const { PORT = 3000} = process.env
const express = require("express")
const app = express()
const mongoose = require("mongoose")

// CONNECTION
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("")

// ROUTES
app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))
