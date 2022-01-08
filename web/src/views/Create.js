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

export const Create = (props) => {
  const [currPlaylist, setCurrPlaylist] = useState(undefined);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      axios
        .get(`${API_URL}view/playlist/${location.state.playlistId}`)
        .then((res) => setCurrPlaylist(res.data));
    }
  });

  return (
    <>
      {!currPlaylist ? (
        <div>
          <h1 className="under-nav">Create a Playlist</h1>
          <form
            onSubmit={(e) =>
              addPlaylist(e)
                .then((res) => res.json()) //TODO doesn't work
                .then((playlist) => {
                  setCurrPlaylist(playlist);
                })
            }
          >
            <input id="name" type="text" placeholder="Name Playlist"></input>
            <input type="submit"></input>
          </form>
        </div>
      ) : (
        <div>
          <form onSubmit={(e) => addVideo(e, currPlaylist)}>
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
    </>
  );
};
