// src/components/TaskList.js
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { updateTask, deleteTask } from "../services/api";

function TaskList({ tasks, setTasks, addHistory }) {
  const handleToggleComplete = async (task) => {
    try {
      const updated = { ...task, completed: !task.completed };
      await updateTask(updated._id, updated);
      setTasks((prev) => prev.map((t) => (t._id === task._id ? updated : t)));
      addHistory(
        updated.completed
          ? `✔️ Marked "${task.title}" as completed`
          : `↩️ Marked "${task.title}" as incomplete`
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      addHistory(`🗑️ Deleted a task`);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Completion percentage
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const completionRate =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // ✅ Helper function to check overdue/upcoming
  const getTaskClass = (task) => {
    if (task.completed) return "list-group-item-success";

    if (task.dueDate) {
      const today = new Date();
      const due = new Date(task.dueDate);
      const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

      if (due < today && !task.completed) return "list-group-item-danger"; // overdue 🔴
      if (diffDays <= 2 && diffDays >= 0) return "list-group-item-warning"; // upcoming 🟡
    }
    return "";
  };

  return (
    <div>
      {/* Progress Bar */}
      <div className="mb-3">
        <p>
          You’ve completed {completedCount} out of {totalCount} tasks ✅
        </p>
        <div className="progress">
          <div
            className={`progress-bar ${
              completionRate === 100 ? "bg-success" : "bg-info"
            }`}
            role="progressbar"
            style={{ width: `${completionRate}%` }}
            aria-valuenow={completionRate}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {Math.round(completionRate)}%
          </div>
        </div>
      </div>

      {/* Task List */}
      <ul className="list-group">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.li
              key={task._id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.2 }}
              className={`list-group-item d-flex justify-content-between align-items-center ${getTaskClass(
                task
              )}`}
            >
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task)}
                    className="form-check-input me-2"
                  />
                  <span
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.title}
                  </span>
                </div>
                {/* ✅ Due date display */}
                {task.dueDate && (
                  <small className="text-muted ms-4">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </small>
                )}
              </div>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default TaskList;
