import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ validation
    if (!form.email || !form.password) {
      return setError("All fields required");
    }

    setLoading(true);

    try {
      const res = await API.post("/login/", {
        username: form.email,
        password: form.password,
      });

      // ✅ store JWT token
      localStorage.setItem("token", res.data.access);

      // ✅ store user info (role from backend)
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: form.email,
          role: res.data.role,
        })
      );

      navigate("/dashboard");

    } catch (err) {
      console.log(err.response?.data);

      // ✅ FIXED ERROR HANDLING
      setError(err.response?.data?.error || "Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email / Username"
          value={form.email}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}