const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
    }
},{timestamps: true})

const Post = mongoose.model("Post", PostSchema)

module.exports = Post