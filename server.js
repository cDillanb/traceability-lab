const express = require("express");
const path = require("path");
const Rollbar = require("rollbar");

let rollbar = new Rollbar({
    accessToken: "e79761c25fa74dd7993f1823abe8a8da",
    captureUncaught: true,
    captureUnhandledRejections: true
});

const app = express();
app.use(express.json());
app.use("/style", express.static("./public/styles.css"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/picture", (req, res) => {

});

const port = process.env.PORT || 5050;

app.use(rollbar.errorHandler());

app.listen(port, () => console.log(`Listening on port ${port}`));
