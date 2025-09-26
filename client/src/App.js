import React, { useState, useEffect } from "react";
import Profile from "./components/Profile";
import Auth from "./components/Auth";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Charts from "./components/Charts";
import HistoryLog from "./components/HistoryLog";
import { getTasks } from "./services/api";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [tasks, setTasks] = useState([]);
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  // Save user
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Fetch tasks when logged in
  useEffect(() => {
    if (user) {
      getTasks()
        .then((res) => setTasks(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  // Save theme
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const addHistory = (message) => {
    setHistory((prev) => [
      { message, time: new Date().toLocaleTimeString() },
      ...prev,
    ]);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  if (!user) return <Auth setUser={setUser} />;

  return (
    <div
      className={`min-vh-100 ${
        theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      {/* Navbar */}
      <nav
        className={`navbar navbar-expand-lg ${
          theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-white"
        } shadow-sm`}
      >
        <div className="container-fluid">
          <h2 className="navbar-brand fw-bold">📌 Task Manager</h2>
          <div className="d-flex align-items-center">
            <span className="me-3 fw-semibold">
              Welcome, <strong>{user?.name || "User"}</strong>
            </span>
            <Profile user={user} />
            <button
              className="btn btn-sm btn-outline-secondary me-2"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-4">
        <div className="row g-4">
          {/* Left: Tasks */}
          <div className="col-lg-5">
            <div className="card shadow-sm mb-3 border-0 rounded-3">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">➕ Add Task</h5>
                <TaskForm setTasks={setTasks} addHistory={addHistory} />
              </div>
            </div>
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">📋 My Tasks</h5>
                <TaskList
                  tasks={tasks}
                  setTasks={setTasks}
                  addHistory={addHistory}
                />
              </div>
            </div>
          </div>

          {/* Right: Charts + History */}
          <div className="col-lg-7">
            <div className="card shadow-sm mb-3 border-0 rounded-3">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">
                  📊 Performance Charts
                </h5>
                <Charts tasks={tasks} />
              </div>
            </div>
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">📜 History Log</h5>
                <HistoryLog history={history} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
