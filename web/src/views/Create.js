import React, { useState, useEffect } from "react";

export const Create = () => {
  const serverUrl = "http://localhost:3001/create";
  const [state, setState] = useState({ apiRes: "" });

  const callAPI = () => {
    fetch(serverUrl + "/")
      .then((res) => res.text())
      .then((res) => setState({ apiRes: res }))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    callAPI();
  }, []);

  const addVideo = (event) => {
    event.preventDefault();

    const data = {
      title: event.target.name.value,
      url: event.target.url.value,
      startTime: event.target.startTime.value,
      endTime: event.target.endTime.value,
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
    });
  };

  const getPlaylists = () => {
    return fetch(serverUrl + "/all-playlists", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((playlists) => playlists);
  };

  return (
    <>
      <h1>Create a Playlist</h1>
      <form onSubmit={addPlaylist}>
        <input id="name" type="text" placeholder="Name Playlist"></input>
        <input type="submit"></input>
      </form>
      <form onSubmit={addVideo}>
        <h2>Select Videos</h2>
        <input id="url" type="text" placeholder="YouTube URL"></input>
        <input
          id="startTime"
          type="text"
          placeholder="Specify start time"
        ></input>
        <input id="endTime" type="text" placeholder="Specify end time"></input>
        <input type="submit"></input>
      </form>
      <h2>Playlist Structure</h2>
      {/*
      here we will display the current structure, eventually these will be replaced with
      video cards that will display video thumbnail, name, selected duration, and needs
      option to remove
      */}
      <button>Save Playlist</button>
      <p>{state.apiRes}</p>
    </>
  );
};
