import { useEffect, useState } from "react";
import { getAllTasksAction } from "../api/methods";
import SingleTask from "./SingleTask";
import "./../scss/tasks.scss";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      setTasks(await getAllTasksAction());
    };
    getTasks();
  }, []);

  return (
    <div className="tasks">
      {tasks.length > 0 &&
        tasks.map((task) => {
          return <SingleTask task={task} key={task._id} />;
        })}
    </div>
  );
};

export default Tasks;
