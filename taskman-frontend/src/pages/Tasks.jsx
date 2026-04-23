import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: ""
  });

  // ✅ EDIT STATE (replaces prompt)
  const [editTask, setEditTask] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: ""
  });

  // ---------------- FETCH TASKS ----------------
  const fetchTasks = async () => {
    const res = await API.get("/tasks/");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ---------------- CREATE TASK ----------------
  const createTask = async () => {
    await API.post("/tasks/", form);
    setForm({ title: "", description: "" });
    fetchTasks();
  };

  // ---------------- DELETE TASK ----------------
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}/`);
    fetchTasks();
  };

  // ---------------- OPEN EDIT MODE ----------------
  const startEdit = (task) => {
    setEditTask(task.id);
    setEditForm({
      title: task.title,
      description: task.description
    });
  };

  // ---------------- UPDATE TASK ----------------
  const updateTask = async () => {
    await API.patch(`/tasks/${editTask}/`, editForm);
    setEditTask(null);
    fetchTasks();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Tasks</h2>

      {/* ---------------- CREATE FORM ---------------- */}
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

      <hr />

      {/* ---------------- EDIT FORM ---------------- */}
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
      {tasks.map((t) => (
        <div key={t.id} style={{ marginBottom: "10px" }}>
          <h4>{t.title}</h4>
          <p>{t.description}</p>

          <button onClick={() => startEdit(t)}>Edit</button>
          <button onClick={() => deleteTask(t.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}