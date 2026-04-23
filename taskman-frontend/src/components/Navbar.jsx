import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      borderBottom: "1px solid #ccc"
    }}>
      
      {/* LEFT SIDE NAV */}
      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/tasks">Tasks</Link>

        {user?.role === "admin" && (
          <Link to="/admin">Admin Panel</Link>
        )}
      </div>

      {/* RIGHT SIDE USER INFO */}
      <div style={{ display: "flex", gap: "10px" }}>
        <span>
          👤 {user?.username} ({user?.role})
        </span>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}