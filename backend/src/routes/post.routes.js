const express = require('express')
const router = express.Router()
const User = require('../models/User.models')
const bcrypt = require('bcrypt')
const Post = require('../models/Post.models')
// const Comment = re 
const verifyToken = require('../VerifyToken')

// Create a Post
router.post('/create', verifyToken, async (req, res) => {
    try {
        const newPost = new Post(req.body)
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Update Post
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})


// Delete Post
router.delete('/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({PostId:req.params.id})
        res.status(200).json("Post deleted sucessfully")
    } catch (error) {
        res.status(500).json(error)
    }
})

// Get post details
router.get("/:id", async(req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
})

// Get all the post
router.get("/", async(req, res) => {
    try{
        const searchFilter = {
            title: {$regex: express.query.search, $options: "i"}
        }
        const posts = await Post.find(express.query.search?searchFilter:null)
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json(err)
    }
})

// Get user posts
router.get("/user/:userId", async(req, res) => {
    try{
        const posts = await Post.find({userId: req.params.userId})
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json(err)
    }
})


// Get Post
router.get("/post/:postId", async(req, res) => {
    try{
        const posts = await Post.find({PostId: req.params.postId})
        res.status(200).json(comments)
    } catch(err){
        res.status(500).json(err)
    }
})

module.exports = router