const express = require("express");
const router = express.Router();
const Video = require("../models/video");

router.get("/", (req, res, next) => {
  res.send("API is working properly");
});

router.get("/add-video", (req, res) => {
  // creating new video from Video model
  const video = new Video({
    title: "Mitch Highlights",
    url: "https://www.youtube.com/watch?v=MZY-qsLl6rY",
    startTime: 20,
    endTime: 60,
  });

  // saving created video to db
  video
    .save()
    .then((r) => {
      res.send(r);
    })
    .catch((err) => console.log(err));
});

router.post("/add-video", (req, res) => {
  const video = new Video({
    title: req.body.title,
    url: req.body.url,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  });

  video
    .save()
    .then((r) => {
      res.send(r);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
