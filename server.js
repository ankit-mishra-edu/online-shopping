//Install express server
const express = require("express");
const path = require("path");
const compression = require("compression");
const app = express();
app.use(compression());

// app.use(express.compress());

// Serve only the static files form the dist directory
app.use(express.static("./dist/PiFi"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/dist/PiFi/index.html"));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4200);
