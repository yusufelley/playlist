import "./PlayButton.css";
import { useNavigate } from "react-router-dom";

export const PlayButton = ({ navState, className }) => {
  const nav = useNavigate();

  const handleClick = () => {
    nav("../play", { state: navState });
  };

  return (
    <button className={`play ${className}`} onClick={handleClick}>
      <i className="material-icons-round play-icon v-center">play_arrow</i>
    </button>
  );
};
