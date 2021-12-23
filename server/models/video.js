const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema defines the interface of data in mongoDB
const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    startTime: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// model is made from schema allowing us to communicate with the collection stored on Atlas
const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
