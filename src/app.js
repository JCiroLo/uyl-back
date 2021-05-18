const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");

require("./passport")(passport);

const app = express();

//Settings
app.set("port", process.env.PORT || 4000);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());


//Routes
app.use("/api/login", require("./routes/login"));
app.use("/api/registry", require("./routes/registry"));
app.use("/api/sites", require("./routes/sites"));
app.use("/api/users", require("./routes/users"));

module.exports = app;