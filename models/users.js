const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const {ObjectId} = mongoose.Schema.Types

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password  : {
        type : String,
        required : true
    },
    followers : [
      {
          type : ObjectId,
          ref : "userModel"
      }
    ],
    following : [
        {
            type : ObjectId,
            ref : "userModel"
        }
    ]
})

const userModel = mongoose.model("userModel",userSchema);

module.exports = userModel;