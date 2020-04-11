const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const requireLogin = require("../middleware/requireLogin");

//To get all posts from all users
router.get('/allpost',(req,res) => {
    Post.find()
    .populate("postedBy","_id name")
    .then((posts) => {
        res.json(posts);
    }).catch((err) => {
        console.log(err);
    })
})

//To create post
router.post('/createpost',requireLogin,(req,res) => {
    const {title,body} = req.body;
    if(!title || !body){
        return res.status(422).json({
            error : "Please fill the required fields"
        })
    }
    req.user.password = undefined;
    const post = new Post({
        title,
        body,
        postedBy : req.user //Accessing the payload data
    })
    
    post.save().then((savedPost) => {
        res.status(200).json({
            post : savedPost
        })
    }).catch((err) => {
        console.log(err);
    })    
})

//To get all posts by me
router.get("/myposts",requireLogin,(req,res) => {
    Post.find({
        postedBy : req.user._id
    }).populate("postedBy","_id name")
    .then((post) => {
        res.json(post);
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;