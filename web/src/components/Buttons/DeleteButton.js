import "./DeleteButton.css";

export const DeleteButton = ({ onClick, className, vid }) => {
  const handleClick = (e) => {
    // delete video; needed to pass multiple args to onClick method
    if (vid) {
      onClick(e, vid, vid.playlist);
    }
  };

  return (
    <button
      className={`delete-button ${className}`}
      onClick={(e) => handleClick(e)}
    >
      <i className="material-icons-round v-center">delete</i>
    </button>
  );
};
