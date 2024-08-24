const express = require('express')
const router = express.Router()
const User = require('../models/User.models')
const bcrypt = require('bcrypt')
const Post = require('../models/Post.models')
// const Comment = re 
const verifyToken = require('../VerifyToken')

// Create a comment
router.post('/create', verifyToken, async (req, res) => {
    try {
        const newComment = new Comment(req.body)
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Update comment
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedComment)
    } catch (error) {
        res.status(500).json(error)
    }
})


// Delete Comment
router.delete('/:id', async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json("Comment deleted sucessfully")
    } catch (error) {
        res.status(500).json(error)
    }
})


// Get Comment
router.get("/post/:postId", async(req, res) => {
    try{
        const comments = await Comment.find({PostId: req.params.postId})
        res.status(200).json(comments)
    } catch(err){
        res.status(500).json(err)
    }
})

module.exports = router