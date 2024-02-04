import { endpoints } from "./endpoints";
import axios from "axios";

const { allTasks, postTask, deleteTask } = endpoints;
export const getAllTasksAction = async () => {
  try {
    const response = await axios.get(allTasks);
    return response.data;
  } catch (error) {
    console.log(error);
    return "Something went wrong";
  }
};
export const createUpdateTaskAction = () => {};
export const deleteTaskAction = () => {};
