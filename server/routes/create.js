const express = require("express");
const { findById } = require("../models/playlist");
const Playlist = require("../models/playlist");
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

  Playlist.findOneAndUpdate(
    { _id: req.body.playlist },
    {
      $push: {
        videos: video,
      },
    }
  );

  video
    .save()
    .then((r) => {
      res.send(r);
    })
    .catch((err) => console.log(err));
});

router.post("/add-playlist", (req, res) => {
  const playlist = new Playlist({
    name: req.body.name,
    videos: [],
  });
  playlist
    .save()
    .then((r) => {
      console.log(`playlist '${req.body.name}' has been added to the db`);
      res.send(r);
    })
    .catch((err) => console.log(err));
});

router.get("/all-playlists", (req, res) => {
  Playlist.find({}, (err, playlists) => {
    console.log("sending playlists to client...");
    console.log(playlists);
    res.send(playlists);
  });
});

module.exports = router;
