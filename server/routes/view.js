const express = require("express");
const Playlist = require("../models/playlist");
const router = express.Router();
const Video = require("../models/video");

router.get("/playlist/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Attempting to fetch playlist: '${id}'...`);
  Playlist.findById(id)
    .then((result) => {
      console.log(`SUCCESS | Sending Playlist: '${result._id}'`);
      res.send({ val: result });
    })
    .catch((err) => {
      console.warn(`ERROR | Requested Playlist: '${id}', could not be found`);
      res.send({ val: undefined }); // needs to be in the form of JSON
    });
});

module.exports = router;
