import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/dbActions";
import axios from "axios";
import { VideoCard } from "../components/Cards/VideoCard";
import {
  deleteVideo,
  addVideo,
  addPlaylist,
  clearPlaylist,
} from "../utils/dbActions";
import { PlayButton } from "../components/Buttons/PlayButton";
import { Loading } from "../components/Loading";

export const Create = (props) => {
  const [currPlaylist, setCurrPlaylist] = useState(undefined);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  console.log(`The current playlist is set to: '${currPlaylist}'`);

  useEffect(() => {
    if (location.state.playlistId) {
      axios
        .get(`${API_URL}view/playlist/${location.state.playlistId}`)
        .then((res) => {
          setCurrPlaylist(res.data.val);
        });
    }
  }, []); //TODO this is not updating in real time

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(`Creating new playlist (${e.target.name.value})...`);
    addPlaylist(e)
      .then((res) => res.json())
      .then((playlist) => {
        setCurrPlaylist(playlist);
        setLoading(false);
      });
  };

  const handleNewVideo = (e) => {
    e.preventDefault();
    setLoading(true);
    addVideo(e, currPlaylist).then((res) => {
      console.log("setLoading to false");
      setLoading(false);
    });
  };

  return (
    <div>
      {!currPlaylist ? (
        <div className="container under-nav">
          <h1 className="header-text">Create a Playlist</h1>
          <form onSubmit={handleSubmit}>
            <input id="name" type="text" placeholder="Name Playlist"></input>
            {loading ? <Loading /> : <input type="submit"></input>}
          </form>
        </div>
      ) : (
        <div>
          <form className="under-nav  container" onSubmit={handleNewVideo}>
            <h2 className="header-text">Select Videos</h2>
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
            {loading ? <Loading /> : <input type="submit"></input>}
          </form>

          <h2>Playlist Structure</h2>
          <ul>
            {currPlaylist.videos.map((vid) => (
              <VideoCard
                vid={vid}
                timestamp={{ from: vid.startTime, to: vid.endTime }}
              />
              // <li key={vid._id}>
              //   Title: {vid.title}, <br />
              //   From: {vid.startTime}s, <br />
              //   To: {vid.endTime}s{" "}
              //   <button onClick={(e) => deleteVideo(e, vid, currPlaylist)}>
              //     Delete
              //   </button>
              // </li>
            ))}
          </ul>
          <button onClick={(e) => clearPlaylist(e, currPlaylist)}>
            Clear Playlist Structure
          </button>
          <PlayButton navState={currPlaylist} />
          <p>{`playlistId: ${currPlaylist._id}`}</p>
        </div>
      )}
    </div>
  );
};
