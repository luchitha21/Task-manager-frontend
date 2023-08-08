import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTasks] = useState([]);

  function loadSavedTasks() {
    axios
      .get(`http://localhost:4000/tasks`)
      .then((res) => {
        setTasks(res.data);
        console.log(tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    loadSavedTasks();
  }, [newTask]);

  function addTask(taskTitle) {
    let task = {
      title: taskTitle,
    };
    axios
      .post(`http://localhost:4000/tasks`, task)
      .then((res) => {
        setNewTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteTaskById(taskId) {
    axios
      .delete(`http://localhost:4000/tasks/${taskId}`)
      .then((res) => {
        setNewTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function toggleTaskCompletedById(taskId) {
    let task = {
      id: taskId?.id,
      completed: taskId?.completed === false ? true : false,
    };
    axios
      .put(`http://localhost:4000/tasks/${taskId?.id}`, task)
      .then((res) => {
        console.log(res);
        setNewTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
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
