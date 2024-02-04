import { endpoints } from "./endpoints";
import axios from "axios";

const { allTasks, postTask, deleteTask } = endpoints;

export const getAllTasksAction = async () => {
  try {
    const response = await axios.get(allTasks);
    return response.data;
  } catch (error) {
    console.log(error);
    return { type: "error", errors: [{ msg: "Something went wrong" }] };
  }
};

export const createUpdateTaskAction = async (formData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(postTask, formData, config);
    if (response.status === 200) {
      return { type: "success", data: response.data };
    } else {
      return { type: "error", errors: response.data.errors };
    }
  } catch (error) {
    console.log(error);
    return { type: "error", errors: error.response.data.errors };
  }
};

export const deleteTaskAction = async (_id) => {
  try {
    const response = await axios.delete(`${deleteTask}/${_id}`);
    if (response.status === 200) {
      return { type: "success", data: response.data };
    } else {
      return { type: "error", errors: response.data.errors };
    }
  } catch (error) {
    console.log(error);
    return { type: "error", errors: error.response.data.errors };
  }
};
