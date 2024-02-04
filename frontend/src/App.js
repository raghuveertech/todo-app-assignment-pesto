import React, { useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import Tasks from "./components/Tasks";
import "./scss/global.scss";

export const AppContext = React.createContext(null);

const App = () => {
  const [view, setView] = useState("list"); // at a time, either list or form is displayed
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({}); //task that is edited
  return (
    <AppContext.Provider
      value={{ view, setView, tasks, setTasks, currentTask, setCurrentTask }}
    >
      <Header />
      {view === "list" && <Tasks />}
      {view === "form" && <TaskForm />}
    </AppContext.Provider>
  );
};

export default App;
