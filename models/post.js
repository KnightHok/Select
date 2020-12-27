let mongoose = require("mongoose");

//Post Schema
let postSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    body: {
        type: String,
        requried: true
    }
});

let Post = module.exports = mongoose.model("Post", postSchema)