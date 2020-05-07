const express = require('express');
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
const passport = require("passport");
const users = require("./routes/api/utilisateur");

require('dotenv').config(); //to have environment variables in dotenv file

//create express server
const app = express();
const port = process.env.PORT || 5000;

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false // use a simple algorithm for shallow parsing
  })
);
app.use(bodyParser.json()); //to parse json

// Connect to MongoDB
/*const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
*/
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/utilisateur", users);

//to start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});