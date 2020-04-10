const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../config/keys").JWT_SECRET;
const requireLogin = require("../middleware/requireLogin");

router.get("/protected",requireLogin,(req,res) => {
    res.send("hello");
})
//Signup Route
router.post('/signup', (req,res) => {
    const {name,email,password} = req.body;

    //Checks for all the required fields 
    if(!name || !email || !password){
        return res.status(422).json("Please enter the required fields");
    }

    //Check if the user exists 
    User.findOne({
        email : email
    }).then((user) => {
        if(user) {
            return res.status(422).json("The user with that email already exist");
        }

        bcrypt.hash(password,10).then((hashedpass)=> {
            const newUser = new User({
                name,
                email,
                password : hashedpass
            })
    
            //Saving user to the database
            newUser.save().then((savedUser) => {
                res.status(200).json("User saved to the database");
            })
            .catch((err) => {
                console.log(err);
            })
        })
    }).catch((err) => {
        console.log(err);
    })
})    

//SignIn Route
router.post('/signin', (req,res) => {
    const {email,password} = req.body;
    if(!email || !password) {
        res.status(422).json("Please fill in the required fields");
    } 
    //Checking if User has signed up or not
    User.findOne({
        email
    }).then((user) => {
        if(!user) {
            return res.status(422).json("User with this email is not registerd");
        }

        bcrypt.compare(password,user.password)
        .then((isMatch) => {
            if(isMatch){
                // res.json({
                //     message : "User successfully signed in"
                // })
                const token = jwt.sign({_id : user._id},secret);
                res.json({token});
            }
            else {
                res.json("Sorry Incorrect Email/Password")
            }
        }).catch((err) => {
            console.log(err);
        })
    })
})
module.exports = router;