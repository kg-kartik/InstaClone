const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const requireLogin = require("../middleware/requireLogin");

//To get all posts from all users
router.get('/allpost',requireLogin,(req,res) => {
    Post.find()
    .populate("postedBy",["_id","name"])
    .populate("comments.postedBy",["_id","name"])
    .then((posts) => {
        res.json(posts);
    }).catch((err) => {
        console.log(err);
    })
})

//To create post
router.post('/createpost',requireLogin,(req,res) => {
    const {title,body,pic} = req.body;
    console.log(title,body,pic);
    if(!title || !body || !pic){
        return res.status(422).json({
            error : "Please fill the required fields"
        })
    }
    req.user.password = undefined;
    const post = new Post({
        title,
        body,
        photo : pic,
        postedBy : req.user //Accessing the payload data
    })
    
    post.save().then((savedPost) => {
        res.status(200).json({
            post : "Saved Post successfully"
        })
    }).catch((err) => {
        res.json({
            error : "error creating post"
        })
    })    
})

//To get all posts by me
router.get("/myposts",requireLogin,(req,res) => {
    Post.find({
        postedBy : req.user._id
    }).populate("postedBy",["_id","name"])
    .then((post) => {
        res.json(post);
    }).catch((err) => {
        console.log(err);
    })
})

//Likes route
router.post('/likes',requireLogin,(req,res) => {
    Post.findByIdAndUpdate(req.body.postId)
    .populate("postedBy",["_id","name"])
    .then((post) => {
        post.likes.push(req.user._id);
        
        post.save()
        .then((savedPost) => {
            res.status(200).json(savedPost);
        }).catch((err) => {
            res.json(err);
        })
    })
})

//Unlikes route
router.post('/unlikes' ,requireLogin,(req,res) => {
    Post.findByIdAndUpdate(req.body.postId , {
        $pull : {likes : req.user._id}
    }, {
        new : true
    }).populate("postedBy",["_id","name"])
    .exec((err,result) => {
        if(err) {
            return res.status(422).json({error : err})
        }
        else {
            res.json(result);
        }
    })
})

//Comments routes
router.post('/comments',requireLogin,(req,res) => {
    const comment = {
        text : req.body.text,
        postedBy : req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId)
    .populate("comments.postedBy",["_id","name"])
    .populate("postedBy",["_id","name"])
    .then((post) => {
        post.comments.push(comment)
        post.save()
        .then((savedPost) => {
            res.json(savedPost);
        }).catch((err) => {
            res.json(err);
        })
    })
})

//Delete post route

router.delete('/delete/:postId',requireLogin,(req,res) => {
    Post.findOne({
        _id : req.params.postId
    }).populate("postedBy",["_id","name"])
    .then((post) => {
        if(post.postedBy._id.toString() === req.user._id.toString())
        {
            post.deleteOne()
            .then((deletedPost) =>{
                res.json(deletedPost);
                console.log("Post successfully deleted");
            }).catch((err) => {
                res.json(err);
            })
        }
    }).catch((err) => {
        console.log(err);
      })
})

module.exports = router;