import React, { useState } from "react";
import { addTask } from "../services/api";

function TaskForm({ setTasks, addHistory }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tag, setTag] = useState("Personal");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const taskData = {
        title,
        priority,
        tag,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null, // ✅ consistent format
        completed: false,
        createdAt: new Date().toISOString(),
      };

      const res = await addTask(taskData);

      setTasks((prev) => [...prev, res.data]);
      addHistory(`Added task: "${title}" (Due: ${dueDate || "No due date"})`);

      // Reset form
      setTitle("");
      setPriority("Medium");
      setTag("Personal");
      setDueDate("");
    } catch (err) {
      console.error(err);
      alert("Failed to add task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="New task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <div className="d-flex flex-wrap gap-2 mb-2">
        {/* Priority */}
        <select
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        {/* Category/Tag */}
        <select
          className="form-select"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <option>Work</option>
          <option>School</option>
          <option>Personal</option>
        </select>

        {/* Due Date */}
        <input
          type="date"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
