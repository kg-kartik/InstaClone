const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {ObjectId} = mongoose.Schema.Types

const postSchema = new Schema({
    title : {
        type : String,
        require : true
    },
    body : {
        type : String,
        required : true
    },
    photo : {
        type : String,
        required : true
    },
    postedBy : {
        type :ObjectId,
        ref : "userModel"
    }
})

const postModel = mongoose.model("postModel",postSchema);
module.exports = postModel;