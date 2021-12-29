const express = require("express");
const { findById } = require("../models/playlist");
const Playlist = require("../models/playlist");
const router = express.Router();
const Video = require("../models/video");
const mongoose = require("mongoose");

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
    },
    (err, suc) => {
      if (err) {
        console.log(err);
      } else {
        console.log("successfully saved to playlist");
      }
    }
  );

  video
    .save()
    .then((r) => {
      console.log("video saved");
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

router.delete("/delete-video/:playlistId/:vidId", (req, res) => {
  Playlist.updateOne(
    { _id: req.params.playlistId },
    { $pull: { videos: { _id: mongoose.Types.ObjectId(req.params.vidId) } } }
  )
    .then((res) =>
      console.log(
        `Video '${req.params.vidId}' Successfully removed from playlist '${req.params.playlistId}'`
      )
    )
    .catch((err) =>
      console.log(
        `error removing video '${req.params.vidId}' from playlist '${req.params.playlistId}'`,
        err
      )
    );
});

router.delete("/delete-playlist/:playlistId", (req, res) => {
  console.log(req.params);
  Playlist.deleteOne({ _id: req.params.playlistId })
    .then((res) => {
      Playlist.find({}).then((res) => console.log(res));
      console.log(`playlist '${req.params.playlistId} has been deleted'`);
    })
    .catch((err) =>
      console.log(`error deleting playlist '${req.params.playlistId}'`)
    );
});

router.post("/clear-playlist/:playlistId", (req, res) => {
  Playlist.updateOne(
    { _id: req.params.playlistId },
    { $set: { videos: [] } },
    { multi: true }
  )
    .then((res) => {
      console.log(
        `Playlist stucture of playlist '${req.params.playlistId}' has been cleared`
      );
    })
    .catch((err) => {
      console.error(
        `error clearing playlist structure of playlist '${req.params.playlistId}'`
      );
    });
});

module.exports = router;
