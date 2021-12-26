import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  }, []);

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
      .then((playlist) => setCurrPlaylist(playlist));
  };

  return (
    <>
      {!currPlaylist ? (
        <div>
          <h1>Create a Playlist</h1>
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
          {/*
      here we will display the current structure, eventually these will be replaced with
      video cards that will display video thumbnail, name, selected duration, and needs
      option to remove
      */}
          <button
            onClick={() => {
              console.log(currPlaylist);
            }}
          >
            Save Playlist
          </button>
          <p>{`playlistId: ${currPlaylist._id}`}</p>
        </div>
      )}
    </>
  );
};
