const mongoose = require("mongoose");

// Image Schema
let imageSchema = mongoose.Schema({
    // all of the fields we want to add will be in metadata
    bucketName: "images",
    metadata: {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        date: { type: Date, default: Date.now }
    }
});

let Image = module.exports = mongoose.model("Image", imageSchema);