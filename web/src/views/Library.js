import React, { useState, useEffect } from "react";
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
          <a href={"http://localhost:3001/view/playlist/" + e._id}>
            <li key={e._id}>{e.name}</li>
          </a>
        ))}
      </ul>
    </>
  );
};
