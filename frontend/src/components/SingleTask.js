import { useContext } from "react";
import { deleteTaskAction } from "../api/methods";
import { AppContext } from "../App";
import "./../scss/single-task.scss";

const SingleTask = ({ task }) => {
  const { setView, setCurrentTask, setTasks } = useContext(AppContext);
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

  const deleteTaskHandler = async () => {
    const response = await deleteTaskAction(task._id);
    if (response.type === "success") {
      setTasks(response.data);
    }
  };

  return (
    <div className="task-item">
      <div className="title">
        <p>{title}</p>
      </div>
      <div className="desc">
        <p>{description}</p>
      </div>
      <div className={`status ${statusText.toLowerCase().replace(/ /g, "-")}`}>
        <span>{statusText}</span>
      </div>
      <div className="actions">
        <button
          className="edit"
          onClick={() => {
            setView("form");
            setCurrentTask(task);
          }}
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button className="delete" onClick={deleteTaskHandler}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default SingleTask;
