// DEPENDENCIES & MIDDLEWARE

require('dotenv').config()
const { PORT = 3000, DATABASE_URL } = process.env
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

// CONNECTION
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error))

// CHEESE MODEL
const CheeseSchema = new mongoose.Schema({
    name: String,
    countryOfOrigin: String,
    image: String
})

const Cheese = mongoose.model("Cheese", CheeseSchema)

// ROUTES, lets just test this, shall we?
//      [home/test]
app.get("/", (req, res) => {
    res.send("Hello World!")
})

//      [index]
app.get("/cheese", async (req,res) => {
    try {
        res.json(await Cheese.find({}))
    } catch (err) {
        res.status(400).json(err)
    }
})

//      [create]
app.post("/cheese", async (req, res) => {
    try {
        res.json(await Cheese.create(req.body))
    } catch (err) {
        res.status(400).json(err)
    }
})

//      [update]
app.put("/cheese/:id", async (req, res) => {
    try {
        res.json(
            await Cheese.findByIdAndUpdate(req.params.id, req.body, {new: true})
        )
    } catch (err) {
        res.status(400).json(err)
    }
})

//      [delete]
app.delete("/people/:id", async (req, res) => {
    try {
        res.json(await Cheese.findByIdAndRemove(req.params.id))
    } catch (err) {
        res.status(400).json(err)
    }
})

//      [show]
app.get("/cheese/:id", async (req, res) => {
    try {
        res.json(await Cheese.findById(req.params.id))
    } catch (err) {
        res.status(400).json(err)
    }
})

// LISTENER 
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))