import "./../scss/single-task.scss";

const SingleTask = ({ task }) => {
  const { title, description, status } = task;
  let statusText;
  switch (status) {
    case 1:
      statusText = "To Do";
      break;
    case 2:
      statusText = "In Progress";
      break;
    case 3:
      statusText = "Completed";
      break;
    default:
      statusText = "To Do";
      break;
  }
  return (
    <div className="task-item">
      <div className="title">{title}</div>
      <div className="desc">{description}</div>
      <div className={`status ${statusText.toLowerCase().replace(/ /g, "-")}`}>
        <span>{statusText}</span>
      </div>
      <div className="actions">
        <button className="edit">
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button className="delete">
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default SingleTask;
