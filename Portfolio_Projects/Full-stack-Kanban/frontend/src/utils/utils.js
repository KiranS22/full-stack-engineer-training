import axios from "axios";
export const taskPost = async (task) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/tasks`,
      { task: task },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log({ status: "error", message: err.message });
  }
};

export const taskUpdateStatus = async (task, id) => {
  console.log("task update function", task);

  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/tasks/update-status/${id}`,
      { task: task },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log({ status: "error", message: err.message });
  }
};

export const taskUpdateContent = async (task, id) => {

  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/tasks/update-info/${id}`,
      { task: task },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log({ status: "error", message: err.message });
  }
};
export const taskDelete = async (id) => {
  console.log("func running", "id", id);
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/tasks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log({ status: "error", message: err.message });
  }
};
