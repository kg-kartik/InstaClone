const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/keys').MongoURI;
const authroute = require("./routes/auth");

mongoose.connect(db, {useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex : true})
.then(() => console.log('Database connected'))
.catch((err) => {
    console.log(err);
})

app.use(express.urlencoded({
    extended : false
}));

app.use(bodyParser.json());

app.use("/",authroute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on ${PORT}`));