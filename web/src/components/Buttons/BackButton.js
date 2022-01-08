import "./BackButton.css";

export const BackButton = () => {
  const handleClick = () => {};

  return (
    <button className="back" onClick={handleClick}>
      <i className="material-icons-round">arrow_back_ios</i>
    </button>
  );
};
