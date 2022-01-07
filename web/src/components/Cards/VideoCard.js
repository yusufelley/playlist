import { convertHMS } from "../../utils/converHMS";
import { DeleteButton } from "../Buttons/DeleteButton";
import { deleteVideo } from "../../utils/dbActions";

export const VideoCard = ({ vid, timestamp }) => {
  const getTimeInterval = () => {
    return `${convertHMS(timestamp.from)} - ${convertHMS(timestamp.to)}`;
  };

  return (
    <div className="card">
      <div className="title">{vid.title}</div> <br />
      <div className="text">{getTimeInterval()}</div> <br />
      <DeleteButton
        onClick={(e) => deleteVideo(e, vid, vid.playlist)}
        vid={vid}
        className="mid-right"
      />
    </div>
  );
};
