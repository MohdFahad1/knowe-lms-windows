import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header({ title }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // const handleLogout = async () => {
  //   const confirmLogout = window.confirm("Are you sure you want to logout?");

  //   if (!confirmLogout) return;

  //   await logout();
  //   navigate("/");
  // };
  const handleLogout = async () => {
  await logout();
  navigate("/");
};

  return (
    <div style={{ padding: "1.5rem" }} className="mb-8 flex items-center justify-between rounded-xl bg-white p-5 shadow">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>

        {user && (
          <p className="mt-1 text-gray-500">
            Welcome, {user.firstName || user.name}
          </p>
        )}
      </div>

      <button
        onClick={handleLogout}
        style={{ padding: "1rem" }}
        className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}