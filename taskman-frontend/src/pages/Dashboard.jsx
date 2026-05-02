import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // ---------------- FORM (CREATE) ----------------
  const [form, setForm] = useState({
    title: "",
    description: ""
  });

  // ---------------- EDIT STATE ----------------
  const [editTask, setEditTask] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: ""
  });

  // ---------------- FETCH TASKS ----------------
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks/");
      setTasks(res.data);
    } catch (err) {
      console.log("Error fetching tasks:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ---------------- CREATE TASK ----------------
  const createTask = async () => {
    try {
      await API.post("/tasks/", form);
      setForm({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // ---------------- DELETE TASK ----------------
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}/`);
      fetchTasks();
    } catch (err) {
      console.log("Delete error:", err.response?.data || err.message);
    }
  };

  // ---------------- OPEN EDIT ----------------
  const startEdit = (task) => {
    setEditTask(task.id);
    setEditForm({
      title: task.title,
      description: task.description
    });
  };

  // ---------------- UPDATE TASK ----------------
  const updateTask = async () => {
    try {
      await API.patch(`/tasks/${editTask}/`, editForm);
      setEditTask(null);
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Dashboard</h2>

      {/* USER INFO */}
      <div style={{ marginBottom: "20px" }}>
        <p><b>Welcome:</b> {user?.username}</p>
        <p><b>Role:</b> {user?.role}</p>
      </div>

      {/* ADMIN PANEL */}
      {user?.role === "admin" && (
        <div
          style={{
            border: "2px solid red",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          <h3>Admin Panel 🔥</h3>
          <p>You have full access</p>
        </div>
      )}

      {/* ---------------- CREATE TASK ---------------- */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Create Task</h3>

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <br />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <br />

        <button onClick={createTask}>Add Task</button>
      </div>

      {/* ---------------- EDIT TASK ---------------- */}
      {editTask && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Edit Task</h3>

          <input
            value={editForm.title}
            onChange={(e) =>
              setEditForm({ ...editForm, title: e.target.value })
            }
          />

          <input
            value={editForm.description}
            onChange={(e) =>
              setEditForm({ ...editForm, description: e.target.value })
            }
          />

          <button onClick={updateTask}>Save</button>
          <button onClick={() => setEditTask(null)}>Cancel</button>
        </div>
      )}

      {/* ---------------- TASK LIST ---------------- */}
      <h3>Tasks</h3>

      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px auto",
              padding: "10px",
              width: "300px",
            }}
          >
            <p><b>{task.title}</b></p>
            <p>{task.description}</p>

            {/* EDIT */}
            <button onClick={() => startEdit(task)}>Edit</button>

            {/* DELETE (admin OR owner safe logic) */}
            {(user?.role === "admin" || task.user === user?.id) && (
              <button
                onClick={() => deleteTask(task.id)}
                style={{ background: "red", color: "white" }}
              >
                Delete
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}