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

  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <>
      <h1>Library</h1>
      <ul>
        {playlists.map((e) => (
          <Link to="/create" state={{ playlistId: e._id }}>
            <li key={e._id}>{e.name}</li>
          </Link>
        ))}
      </ul>
    </>
  );
};
