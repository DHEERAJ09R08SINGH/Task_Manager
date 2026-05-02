// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("token");

//   if (!token) return <Navigate to="/login" />;

//   return children;
// }
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" />;

  // 👇 ROLE CHECK
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <p>Access Denied</p>;
  }

  return children;
}