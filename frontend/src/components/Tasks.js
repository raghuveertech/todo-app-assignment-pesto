import { useContext, useEffect, useState } from "react";
import { getAllTasksAction } from "../api/methods";
import SingleTask from "./SingleTask";
import "./../scss/tasks.scss";
import { AppContext } from "../App";

const Tasks = () => {
  const { tasks, setTasks } = useContext(AppContext);
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    const getTasks = async () => {
      setTasks(await getAllTasksAction());
    };
    getTasks();
  }, []);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleFilterTasks = (e) => {
    const status = Number(e.target.value);
    if (status === 0) {
      setFilteredTasks(tasks);
    } else {
      const filtertedTasks = tasks.filter((task) => {
        return task.status === status;
      });
      setFilteredTasks(filtertedTasks);
    }
  };

  return (
    <div>
      <div className="filter-tasks">
        <div className="form-field">
          <label>Status</label>
          <select name="status" onChange={handleFilterTasks}>
            <option value={0}>All</option>
            <option value={1}>To Do</option>
            <option value={2}>In Progress</option>
            <option value={3}>Completed</option>
          </select>
        </div>
      </div>
      <div className="card">
        <div className="task-item header">
          <div className="title">
            <p>Title</p>
          </div>
          <div className="desc">
            <p>Description</p>
          </div>
          <div className="status to-do">
            <p>Status</p>
          </div>
          <div className="actions">
            <p>Actions</p>
          </div>
        </div>
        {filteredTasks.length > 0 &&
          filteredTasks.map((task) => {
            return <SingleTask task={task} key={task._id} />;
          })}
        {filteredTasks.length === 0 && (
          <p className="no-tasks">No tasks to display</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
