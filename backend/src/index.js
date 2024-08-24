const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const multer = require('multer')
const app = express()

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('database is connected sucessfully')
    } catch (error) {
        console.log('something went wrong => ', error)
    }
}


app.get("/", (req, res) => {
    res.send("Your are on home page")
})

app.listen(process.env.PORT,() => {
    ConnectDB()
    console.log("Your server is running on", process.env.PORT)
})