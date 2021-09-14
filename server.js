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
    let pictures = [
        "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/is_my_cat_normal_slideshow/1800x1200_is_my_cat_normal_slideshow.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/9/94/My_dog.jpg",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bW91bnRhaW5zfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    ];

    let randomIndex = Math.floor(Math.random() * pictures.length);
    let randomPicture = pictures[randomIndex];

    res.status(200).send(randomPicture);
});

const port = process.env.PORT || 5050;

app.use(rollbar.errorHandler());

app.listen(port, () => console.log(`Listening on port ${port}`));
