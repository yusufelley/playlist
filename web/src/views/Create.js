import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export const Create = (props) => {
  const serverUrl = "http://localhost:3001/create";
  const [currPlaylist, setCurrPlaylist] = useState(undefined);

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      axios
        .get("http://localhost:3001/view/playlist/" + location.state.playlistId)
        .then((res) => setCurrPlaylist(res.data));
    }
  });

  const addVideo = (event) => {
    event.preventDefault();

    const data = {
      title: event.target.name.value,
      url: event.target.url.value,
      startTime: event.target.startTime.value,
      endTime: event.target.endTime.value,
      playlist: currPlaylist._id,
    };

    fetch(serverUrl + "/add-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const addPlaylist = (event) => {
    event.preventDefault();

    const data = {
      name: event.target.name.value,
    };

    fetch(serverUrl + "/add-playlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((playlist) => {
        setCurrPlaylist(playlist);
      });
  };

  const deleteVideo = (e, vid) => {
    e.preventDefault();
    const url = `http://localhost:3001/create/delete-video/${currPlaylist._id}/${vid._id}`;

    axios.delete(url);
  };

  const clearPlaylist = (e) => {
    const url = `http://localhost:3001/create/clear-playlist/${currPlaylist._id}`;
    axios.post(url);
  };

  const playVideo = (e) => {};

  return (
    <>
      {!currPlaylist ? (
        <div>
          <h1 className="under-nav">Create a Playlist</h1>
          <form onSubmit={addPlaylist}>
            <input id="name" type="text" placeholder="Name Playlist"></input>
            <input type="submit"></input>
          </form>
        </div>
      ) : (
        <div>
          <form onSubmit={addVideo}>
            <h2>Select Videos</h2>
            <input id="name" type="text" placeholder="Name Video"></input>

            <input id="url" type="text" placeholder="YouTube URL"></input>
            <input
              id="startTime"
              type="text"
              placeholder="Specify start time"
            ></input>
            <input
              id="endTime"
              type="text"
              placeholder="Specify end time"
            ></input>
            <input type="submit"></input>
          </form>
          <h2>Playlist Structure</h2>
          <ul>
            {currPlaylist.videos.map((vid) => (
              <li key={vid._id}>
                Title: {vid.title}, <br />
                From: {vid.startTime}s, <br />
                To: {vid.endTime}s{" "}
                <button onClick={(e) => deleteVideo(e, vid)}>Delete</button>
              </li>
            ))}
          </ul>
          <Link to="/">
            <button>Save Playlist</button>
          </Link>
          <button onClick={clearPlaylist}>Clear Playlist Structure</button>
          <Link to="/play" state={currPlaylist}>
            <button>Play</button>
          </Link>
          <p>{`playlistId: ${currPlaylist._id}`}</p>
        </div>
      )}
    </>
  );
};
