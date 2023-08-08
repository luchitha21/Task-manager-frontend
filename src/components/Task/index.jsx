import styles from "./task.module.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";

export function Task({ task, onDelete, onComplete }) {
  return (
    <div className={styles.task}>
      <button
        className={styles.checkContainer}
        onClick={() => onComplete(task)}
      >
        {task.completed ? <BsFillCheckCircleFill /> : <div />}
      </button>

      <p className={task.completed ? styles.textCompleted : ""}>{task.title}</p>

      <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}
