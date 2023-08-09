import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import { notification } from "antd";
import { BASE_URL } from "./constants";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  function loadSavedTasks() {
    axios
      .get(BASE_URL)
      .then((res) => {
        setTasks(res.data);
        console.log(tasks);
      })
      .catch((err) => {
        notification.error({ message: "Something went wrong" });
      });
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  function addTask(taskTitle) {
    let task = {
      title: taskTitle,
    };
    axios
      .post(BASE_URL, task)
      .then((res) => {
        loadSavedTasks();
      })
      .catch((err) => {
        notification.error({ message: "something went wrong" });
      });
  }

  function deleteTaskById(taskId) {
    axios
      .delete(`${BASE_URL}/${taskId}`)
      .then((res) => {
        loadSavedTasks();
      })
      .catch((err) => {
        notification.error({ message: err });
      });
  }

  function toggleTaskCompletedById(taskId) {
    let task = {
      id: taskId?.id,
      completed: taskId?.completed === false ? true : false,
    };
    axios
      .put(`${BASE_URL}/${taskId?.id}`, task)
      .then((res) => {
        loadSavedTasks();
      })
      .catch((err) => {
        notification.error({ message: err });
      });
  }

  return (
    <>
      <Header handleAddTask={addTask} />
      <Tasks
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
      />
    </>
  );
}

export default App;
