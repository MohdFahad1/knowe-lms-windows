import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const { login, loading, error, clearError, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/boards");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const result = await login({
      email,
      password,
    });

    if (result.success) {
      navigate("/boards");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-4xl font-bold">Knowe LMS</h1>

        <p className="mb-8 text-center text-gray-500">Welcome Back</p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => {
                clearError();
                setEmail(e.target.value);
              }}
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Password</label>

            <div className="flex">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  clearError();
                  setPassword(e.target.value);
                }}
                className="flex-1 rounded-l-lg border p-3 outline-none focus:border-blue-500"
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="rounded-r-lg border border-l-0 px-4"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
