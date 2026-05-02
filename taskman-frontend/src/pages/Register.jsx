import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
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

    // ✅ Validation
    if (!form.email || !form.password) {
      return setError("All fields required");
    }

    setLoading(true);

    try {
      // ✅ FIX: send username instead of email
      await API.post("/register/", {
        username: form.email,   // OR change UI to username field
        email: form.email,
        password: form.password
      });

      // ✅ redirect after success
      navigate("/login");

    } catch (err) {
      console.log(err.response?.data); // 👈 debug real error
      setError(err.response?.data?.message || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Register</h2>

      {/* ❌ Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}