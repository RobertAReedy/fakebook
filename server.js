const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

//connects to an existing database, or creates one if there isn't one
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/fakebook", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//this just logs mongo queries being executed; can comment out if necessary
// mongoose.set("debug", true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));