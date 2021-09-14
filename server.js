const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use("/style", express.static("./public/styles.css"));

const port = process.env.PORT || 5050;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.listen(port, () => console.log(`Listening on port ${port}`));