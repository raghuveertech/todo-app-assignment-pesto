import { useState, useEffect, useContext } from "react";
import { createUpdateTaskAction } from "../api/methods";
import { AppContext } from "../App";
import "./../scss/task-form.scss";

const TaskForm = () => {
  const { setView, setTasks, currentTask, setCurrentTask } =
    useContext(AppContext);

  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    description: "",
    status: 1,
  });

  const [titleError, setTitleError] = useState("");
  const [apiErrors, setApiErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setFormData((prevFormData) => {
      let name = e.target.name;
      let value = e.target.value;
      if (e.target.name === "status") {
        value = Number(e.target.value);
      }
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!title.trim()) {
      setTitleError("Please enter title");
      return;
    }
    const response = await createUpdateTaskAction(JSON.stringify(formData));
    if (response.type === "success") {
      setTasks(response.data);
      setView("list");
      setLoading(false);
    } else {
      setApiErrors(response.errors);
      setLoading(false);
    }
  };

  useEffect(() => {
    setFormData({
      ...currentTask,
    });
  }, [currentTask._id]);

  const { _id, title, description, status } = formData;
  return (
    <div className="task-form card">
      <button
        className="close"
        onClick={() => {
          setCurrentTask({});
          setView("list");
        }}
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
      {apiErrors && apiErrors.length > 0 ? (
        <ul className="api-errors">
          {apiErrors.map((apiError) => {
            return <li>{apiError.msg}</li>;
          })}
        </ul>
      ) : null}
      <form onSubmit={submitHandler}>
        <div className={` ${titleError ? "error" : ""} form-field`}>
          <label>Title</label>
          <input name="title" value={title} onChange={changeHandler} />
          {titleError ? (
            <p className="error">
              <i class="fa-solid fa-triangle-exclamation"></i> {titleError}
            </p>
          ) : null}
        </div>
        <div className="form-field">
          <label>Description</label>
          <input
            name="description"
            value={description}
            onChange={changeHandler}
          />
        </div>
        <div className="form-field">
          <label>Status</label>
          <select name="status" value={status} onChange={changeHandler}>
            <option value={1}>To Do</option>
            <option value={2}>In Progress</option>
            <option value={3}>Completed</option>
          </select>
        </div>
        <div className="form-field create-button">
          <button className={`${loading ? "loading" : ""}`} type="submit">
            {_id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
