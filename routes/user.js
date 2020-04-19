const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require("../middleware/requireLogin");
const User = require("../models/users");
const Post = require("../models/post");

router.get("/user/:id",requireLogin,(req,res) => {   
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
        console.log(err);
    }).catch((err) => {
        console.log(err);
    })
})

//Follow route
router.post('/follow',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      User.findByIdAndUpdate(req.user._id,{
          $push:{following:req.body.followId}
          
      },{new:true}).select("-password").then(result=>{
          res.json(result)
      }).catch(err=>{
          return res.status(422).json({error:err})
      })
    })
})

//Unfollow route
router.post('/unfollow',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      User.findByIdAndUpdate(req.user._id,{
          $pull:{following:req.body.unfollowId}
          
      },{new:true}).select("-password").then(result=>{
          res.json(result)
      }).catch(err=>{
          return res.status(422).json({error:err})
      })

    }
    )
})
module.exports = router;