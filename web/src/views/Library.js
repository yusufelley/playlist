import React, { useState, useEffect } from "react";
import { Create } from "../views/Create";
import { Link } from "react-router-dom";
import { PlaylistCard } from "../components/Cards/PlaylistCard";
import axios from "axios";
import { getPlaylistDuration, getPlaylists } from "../utils/dbActions";

export const Library = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getPlaylists()
      .then((res) => {
        const data = res.data;
        setPlaylists(data);
        console.log(`Library has recieved playlist data`);
      })
      .catch((err) => {
        console.warn(`an error has occured getting playlists for library`);
      });
  }, [playlists.length]);

  return (
    <>
      <h1 className="under-nav">Library</h1>
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
            {/* <button
              onClick={(e) =>
                deletePlaylist(e, playlist)
                  .then((res) => {
                    getPlaylists();
                    console.log(`Playlist '${playlist._id}' has been deleted`);
                  })
                  .catch((err) =>
                    console.error(`error deleting playlist '${playlist._id}'`)
                  )
              }
            >
              Delete
            </button> */}
          </>
        ))}
      </ul>
    </>
  );
};
