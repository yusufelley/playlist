import "./PlayButton.css";
import { useNavigate } from "react-router-dom";

export const PlayButton = ({ navState }) => {
  const nav = useNavigate();

  const handleClick = () => {
    nav("../play", { state: navState });
  };

  return (
    <button className="play mid-right" onClick={handleClick}>
      <i className="material-icons-round play-icon v-center">play_arrow</i>
    </button>
  );
};
