const express = require("express");
const path = require("path");
const Rollbar = require("rollbar");

let rollbar = new Rollbar({
    accessToken: "9c276d25c29b437da957ce171764b2c0",
    captureUncaught: true,
    captureUnhandledRejections: true
});

// rollbar.log("Hello world!")
const app = express();
app.use(express.json());
app.use("/style", express.static("./public/styles.css"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
    rollbar.info("HTML launched successfully!");
});

app.get("/api/picture", (req, res) => {
    res.sendStatus(400);
    rollbar.error("400");
});

const port = process.env.PORT || 5050;

app.use(rollbar.errorHandler());

app.listen(port, () => console.log(`Listening on port ${port}`));
