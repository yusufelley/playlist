import "./DeleteButton.css";

export const DeleteButton = ({ onClick, className }) => {
  const handleClick = () => {
    return onClick();
  };

  return (
    <button className={`delete-button ${className}`} onClick={handleClick}>
      <i className="material-icons-round v-center">menu</i>
    </button>
  );
};
