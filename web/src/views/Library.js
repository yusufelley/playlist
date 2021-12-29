import React, { useState, useEffect } from "react";
import { Create } from "../views/Create";
import { Link } from "react-router-dom";
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
            <Link to="/create" state={{ playlistId: playlist._id }}>
              <li key={playlist._id}>{playlist.name}</li>
            </Link>
            <button onClick={(e) => deletePlaylist(e, playlist)}>Delete</button>
          </>
        ))}
      </ul>
    </>
  );
};
