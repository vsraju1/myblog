// Modules
const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// Routes
const authRoute = require('./routes/auth.routes')
const userRoute = require('./routes/user.routes')
const postRoute = require('./routes/post.routes')
const commentRoute = require('./routes/comments.routes')


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

// Middlewares
app.use("/images", express.static(path.join(__dirname, "/images")))
console.log(cors())

app.use(cookieParser())
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/comments", commentRoute)

// Uploading Image
const storage = multer.diskStorage({
    destination: (req, file, fn) => {
        fn(null, "images")
    },
    filename: (req, file, fn) => {
        fn(null, req.body.img)
    }
})

const upload = multer({storage: storage})
app.post("/api/upload", upload.single("file"), (req,res) => {
    res.status(200).json("Image uploaded sucessfully")
})


app.listen(process.env.PORT,() => {
    ConnectDB()
    console.log("Your server is running on", process.env.PORT)
})