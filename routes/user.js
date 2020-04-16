const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require("../middleware/requireLogin");
const User = require("../models/users");
const Post = require("../models/post");

router.get("/user/:id",(req,res) => {   
    User.findOne({
        _id : req.params.id
    })
    .select("-password")
    .then((user) => {
        Post.find({
            postedBy : req.params.id
        })
        .populate("postedBy",["_id","name"])
        .then((post) => {
            res.json({user,post});
        })
    }).catch((err) => {
        res.json(err);
    })
})

module.exports = router;