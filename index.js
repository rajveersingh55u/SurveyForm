const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

const cookieSession = require('cookie-session');
const passport = require('./services/passport');
const keys = require('./config/keys');

//Require the file, then execute immediately bt passing express app object
require("./routes/oauthRoutes");

require("./models/User");

app.get("/", (req,res) => {
    res.render("index")
});

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`server is running at port no ${port}`);
});

//since passport files deoes not return anything . just require.
// require('./services/passport'); 

//connect to mongo
mongoose.connect(keys.mongoURI);

//create cookies and set in express
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey],
	})
);


 


