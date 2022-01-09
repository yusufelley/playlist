import axios from "axios";
import { convertHMS } from "./converHMS";

export const API_URL = "http://localhost:3001/";

export const getPlaylists = () => {
  return axios.get(`${API_URL}create/all-playlists`);
};

export const deleteVideo = (e, vid, currPlaylistId) => {
  e.preventDefault();
  const url = `${API_URL}create/delete-video/${currPlaylistId}/${vid._id}`;

  return axios.delete(url);
};

export const addPlaylist = (event) => {
  event.preventDefault();

  const data = {
    name: event.target.name.value,
  };

  return fetch(`${API_URL}create//add-playlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const deletePlaylist = (e, playlist) => {
  console.log(playlist);
  const url = `${API_URL}create/delete-playlist/${playlist._id}`;
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

  return fetch(`${API_URL}create/add-video`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const clearPlaylist = (e, currPlaylist) => {
  const url = `${API_URL}create/clear-playlist/${currPlaylist._id}`;
  return axios.post(url);
};

export const getPlaylistDuration = (playlist) => {
  const duration = playlist.videos.reduce((playlistDuration, video) => {
    const videoDuration = video.endTime - video.startTime;
    playlistDuration += videoDuration;
    return playlistDuration;
  }, 0);

  return convertHMS(duration);
};
