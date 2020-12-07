const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

// view engine is a template library and it implements view functionality
app.set("view engine", "pug");
//app.set("views", path.join(__dirname, "views"));



// LANDING PAGE
app.get("/", (req, res) => {
    res.render("index", {title: "Hey", message: "Hello There!"});
});

app.listen(port, () => {
    console.log("server started");
})