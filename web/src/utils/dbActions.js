import axios from "axios";
import { convertHMS } from "./converHMS";

export const getPlaylists = () => {
  return axios.get("http://localhost:3001/create/all-playlists");
};

export const deleteVideo = (e, vid, currPlaylistId) => {
  e.preventDefault();
  const url = `http://localhost:3001/create/delete-video/${currPlaylistId}/${vid._id}`;

  return axios.delete(url);
};

export const addPlaylist = (event) => {
  event.preventDefault();

  const data = {
    name: event.target.name.value,
  };

  return fetch("http://localhost:3001/create//add-playlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const deletePlaylist = (e, playlist) => {
  console.log(playlist);
  const url = `http://localhost:3001/create/delete-playlist/${playlist._id}`;
  return axios.delete(url);
};

export const addVideo = (event, currPlaylist) => {
  event.preventDefault();

  const data = {
    title: event.target.name.value,
    url: event.target.url.value,
    startTime: event.target.startTime.value,
    endTime: event.target.endTime.value,
    playlist: currPlaylist._id,
  };

  fetch("http://localhost:3001/create/add-video", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const clearPlaylist = (e, currPlaylist) => {
  const url = `http://localhost:3001/create/clear-playlist/${currPlaylist._id}`;
  axios.post(url);
};

export const getPlaylistDuration = (playlist) => {
  const duration = playlist.videos.reduce((playlistDuration, video) => {
    const videoDuration = video.endTime - video.startTime;
    playlistDuration += videoDuration;
    return playlistDuration;
  }, 0);

  return convertHMS(duration);
};
