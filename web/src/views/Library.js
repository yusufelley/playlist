import React, { useState, useEffect } from "react";
import { Create } from "../views/Create";
import { Link } from "react-router-dom";
import { PlaylistCard } from "../components/Cards/PlaylistCard";
import axios from "axios";

export const Library = () => {
  const serverUrl = "http://localhost:3001/create";
  const [playlists, setPlaylists] = useState([]);

  const getPlaylists = () => {
    axios
      .get(serverUrl + "/all-playlists")
      .then((res) => {
        const data = res.data;
        setPlaylists(data);
        console.log(`Library has recieved playlist data`);
      })
      .catch((err) => {
        console.warn(`an error has occured getting playlists for library`);
      });
  };

  const getPlaylistDuration = (playlist) => {
    function convertHMS(value) {
      const sec = parseInt(value, 10); // convert value to number if it's string
      let hours = Math.floor(sec / 3600); // get hours
      let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
      let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
      // add 0 if value < 10; Example: 2 => 02
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return hours + ":" + minutes + ":" + seconds; // Return is HH : MM : SS
    }

    const duration = playlist.videos.reduce((playlistDuration, video) => {
      const videoDuration = video.endTime - video.startTime;
      playlistDuration += videoDuration;
      return playlistDuration;
    }, 0);

    return convertHMS(duration);
  };

  const deletePlaylist = (e, playlist) => {
    console.log(playlist);
    const url = `http://localhost:3001/create/delete-playlist/${playlist._id}`;
    axios
      .delete(url)
      .then((res) => {
        getPlaylists();
        console.log(`Playlist '${playlist._id}' has been deleted`);
      })
      .catch((err) =>
        console.error(`error deleting playlist '${playlist._id}'`)
      );
  };

  useEffect(() => {
    getPlaylists();
  }, [playlists.length]);

  return (
    <>
      <h1>Library</h1>
      <ul>
        {playlists.map((playlist) => (
          <>
            <PlaylistCard
              key={playlist._id}
              title={playlist.name}
              linkProps={{
                to: "/create",

                state: { playlistId: playlist._id },
              }}
              playlist={playlist}
              duration={getPlaylistDuration(playlist)}
            />
            {/* <button onClick={(e) => deletePlaylist(e, playlist)}>Delete</button> */}
          </>
        ))}
      </ul>
    </>
  );
};
