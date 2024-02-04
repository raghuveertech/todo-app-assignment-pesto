import { useContext, useEffect } from "react";
import { getAllTasksAction } from "../api/methods";
import SingleTask from "./SingleTask";
import "./../scss/tasks.scss";
import { AppContext } from "../App";

const Tasks = () => {
  const { tasks, setTasks } = useContext(AppContext);

  useEffect(() => {
    const getTasks = async () => {
      setTasks(await getAllTasksAction());
    };
    getTasks();
  }, []);

  return (
    <div className="card">
      <div class="task-item header">
        <div class="title">
          <p>Title</p>
        </div>
        <div class="desc">
          <p>Description</p>
        </div>
        <div class="status to-do">
          <p>Status</p>
        </div>
        <div class="actions">
          <p>Actions</p>
        </div>
      </div>
      {tasks.length > 0 &&
        tasks.map((task) => {
          return <SingleTask task={task} key={task._id} />;
        })}
      {tasks.length === 0 && <p className="no-tasks">No tasks to display</p>}
    </div>
  );
};

export default Tasks;
