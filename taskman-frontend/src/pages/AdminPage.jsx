import { useEffect, useState } from "react";
import API from "../api/axios";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user"));

  // 📌 FETCH USERS
  const fetchUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    }

    setLoading(false);
  };

  // 📌 DELETE USER
  const deleteUser = async (id) => {
    if (currentUser?.role !== "admin") {
      return setError("Not authorized");
    }

    try {
      await API.delete(`/admin/users/${id}`);
      fetchUsers(); // refresh list
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  // 📌 PROMOTE USER (optional but strong feature)
  const promoteUser = async (id) => {
    try {
      await API.put(`/admin/users/${id}/role`, { role: "admin" });
      fetchUsers();
    } catch (err) {
      setError("Role update failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Admin Panel</h2>

      {/* 🔄 Loading */}
      {loading && <p>Loading users...</p>}

      {/* ❌ Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 📋 USERS LIST */}
      {users.map((user) => (
        <div
          key={user._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>

          {/* 🗑 Delete */}
          <button onClick={() => deleteUser(user._id)}>
            Delete
          </button>

          {/* ⬆ Promote */}
          {user.role !== "admin" && (
            <button onClick={() => promoteUser(user._id)}>
              Make Admin
            </button>
          )}
        </div>
      ))}
    </div>
  );
}