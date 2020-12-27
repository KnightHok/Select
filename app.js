const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const multer = require("multer");
const upload = multer({ dest: "mongodb://localhost/test1" });

//Bring in Models
const Product = require("./models/product");

// this connects to your database
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost/test1");
let db = mongoose.connection;

// Check connection
db.once("open", () => {
    console.log("Connected to MongoDB")
});

// Check for DB errors
db.on("error", (err) => {
    console.log(err);
    
});

const { createReadStream } = require("fs");
const { createModel, createBucket } = require("mongoose-gridfs");

let imageSchema = {
    modelName: "Image",
    bucketName: "images",
    connection: db
}

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

// view engine is a template library and it implements view functionality
app.set("view engine", "pug");

// LANDING PAGE
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/display", (req, res) => {
    Product.find({}, (err, products) => {
        res.render("display-products", {products: products});
    });
});

app.get("/upload-image", (req, res) => {
    res.render("image_upload");
});

// Upload image to site
app.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.file, req.body);
    
    let title = req.body.title;
    let description = req.body.description;
    let price = req.body.price;

    let newProduct = { title: title, description: description, price: price};

    // Create New Product in DB
    Product.create(newProduct, (err, product) => {
        if(err){
            console.log(err);
        } else {
            let Image = createModel(imageSchema);
            const filename = req.file.originalname;
            const _id = mongoose.Types.ObjectId();
            let metadata = {
                product: product._id
            }
            // reads the database for filename
            const readStream = createReadStream(req.file.path);
            Image.write({ _id, filename, metadata }, readStream);

            product.images = [_id];
            product.save();
            console.log(product)

            res.redirect("/display");
        }
    });
});

app.listen(port, () => {
    console.log("server started");
})