const express = require("express");
const path = require("path");
const Rollbar = require("rollbar");

let rollbar = new Rollbar({
    accessToken: "5de85941061941f29db1b7389b972851",
    captureUncaught: true,
    captureUnhandledRejections: true
});

const app = express();
app.use(express.json());
app.use("/style", express.static("./public/styles.css"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
    rollbar.info("HTML launched successfully!");
});

app.get("/api/picture", (req, res) => {

});

const port = process.env.PORT || 5050;

app.use(rollbar.errorHandler());

app.listen(port, () => console.log(`Listening on port ${port}`));
