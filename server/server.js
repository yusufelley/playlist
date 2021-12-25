const express = require("express");
const createRoutes = require("./routes/create");
const viewRoutes = require("./routes/view");
const cors = require("cors");
const mongoose = require("mongoose");

// setting up express app
const app = express();

// Used to parse incoming requests as json
app.use(express.json());

// mongoDB connetion string
const dbURI =
  "mongodb+srv://admin:admin@playlist.crvyd.mongodb.net/playlist?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then((res) => app.listen(3001))
  .catch((err) => console.log(err));

// routes
app.use(cors());
app.use("/create", createRoutes);
app.use("/view", viewRoutes);
