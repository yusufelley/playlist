const express = require("express");
const Playlist = require("../models/playlist");
const router = express.Router();
const Video = require("../models/video");

router.get("/playlist/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Playlist.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(`playlist with id: '${id}' could not be found`);
      res.send();
    });
});

module.exports = router;
