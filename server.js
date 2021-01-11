const express = require("express");
const compression = require("compression");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const logger = require("morgan");

const PORT = process.env.PORT || 3001;

// logging (development)
app.use(logger("dev"));

// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/google-books-search",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
  }
);

// Start the API server
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
