import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function Dashboard() {
  const { user, logout } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks/");
      setTasks(response.data);
    } catch (err) {
      setError("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/tasks/", { title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create task");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  return (
    <div className="dashboard-container" style={{ maxWidth: "700px", margin: "50px auto" }}>
      <h2>Dashboard</h2>

      <p>
        Welcome <strong>{user?.username}</strong> ({user?.role})
      </p>

      <button onClick={logout} style={{ marginBottom: "20px" }}>
        Logout
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Create Task</h3>
      <form onSubmit={handleCreate}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit">Add Task</button>
      </form>

      <h3 style={{ marginTop: "30px" }}>Your Tasks</h3>

      {tasks.length === 0 && <p>No tasks yet.</p>}

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <div>
              <strong>{task.title}</strong>
              <div>{task.description}</div>
            </div>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
