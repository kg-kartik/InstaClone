const jwt = require("jsonwebtoken");
const secret = require("../config/keys").JWT_SECRET
const mongoose = require("mongoose");
const User = require("../models/users");

module.exports = (req,res,next)=> {
    const {authorization} = req.headers;
    if(!authorization) {
        return res.status(401).json({
            error : "no header provided"
        })
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token,secret,(err,payload)=>{
        if(err) {
            return res.status(401).json({
                err : "You must be logged ins"
            })
        }
        const {_id} = payload;
        User.findById(_id).then((userdata) => {
            req.user = userdata
            next();
        })
    })
}