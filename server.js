const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3000;

// Set up express 
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Set up of mongoose database connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnesstracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

//routes to pages
app.use(require("./routes/api-routes.js"));
app.use(require("./routes/html-routes.js"));

// Listen to request on PORT (as set above for heroku)
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});