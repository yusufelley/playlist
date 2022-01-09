import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { useLocation } from "react-router-dom";
import "./Play.css";
const getYoutubeID = require("get-youtube-id");

export const Play = () => {
  const location = useLocation();
  const videos = location.state.videos;
  const vid1 = videos[0];

  const defaultOpts = {
    playerVars: {
      autoplay: 1,
      start: vid1.startTime,
      end: vid1.endTime,
    },
  };

  const defaultPlayerSettings = {
    id: getYoutubeID(vid1.url),
    opts: defaultOpts,
    index: 0,
  };

  const [playerSettings, setPlayerSettings] = useState(defaultPlayerSettings);
  console.log("RENDER", playerSettings);

  const playNextVideo = () => {
    const nextVid = videos[playerSettings.index + 1];
    console.log("next video:", nextVid);

    if (nextVid) {
      console.log("PREPARING NEXT VIDEO");
      setPlayerSettings((prev) => {
        console.log("Prev Player Settings:", prev);

        return {
          id: getYoutubeID(nextVid.url),
          opts: {
            playerVars: {
              ...prev.opts.playerVars,
              start: nextVid.startTime,
              end: nextVid.endTime,
            },
          },
          index: prev.index + 1,
        };
      });
    }
    console.log("Updated Player Settings", playerSettings);
  };

  return (
    <div className="player-wrapper under-nav">
      <YouTube
        className="player"
        videoId={playerSettings.id}
        opts={playerSettings.opts}
        onEnd={playNextVideo}
      />
    </div>
  );
};
