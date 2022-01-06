import "./PlaylistCard.css";
import { DeleteButton } from "../Buttons/DeleteButton";
import { PlayButton } from "../Buttons/PlayButton";
import { Link } from "react-router-dom";

export const PlaylistCard = ({ duration, title, linkProps, playlist }) => {
  const editCard = () => {
    console.log("edit");
  };

  const deletePlaylist = () => {
    console.log("delete");
  };

  const playPlaylist = () => {
    console.log("play");
  };

  return (
    <div className="card">
      <Link to={linkProps.to} state={linkProps.state}>
        <div className="title">{title}</div> <br />
      </Link>
      <div className="text">{`Duration: ${duration}`}</div> <br />
      <PlayButton navState={playlist} />
    </div>
  );
};
