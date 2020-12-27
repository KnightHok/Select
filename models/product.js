const mongoose = require("mongoose");

let productSchema = mongoose.Schema({
    title: { type: String },
    description: { type: String },
    price: Number,
    images: [{type: mongoose.Schema.Types.ObjectId, ref: "Image"}],
    date: { type: Date, default: Date.now }

})

let Product = module.exports = mongoose.model("Product", productSchema)