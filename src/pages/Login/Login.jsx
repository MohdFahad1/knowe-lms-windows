import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import Logo from "../../assets/Knowe_Logo.png";
import Book from "../../assets/book.png";

export default function Login() {
  const navigate = useNavigate();

  const { login, loading, error, clearError, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/boards");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    if (!email || !password) {
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
    <div className="min-h-screen w-full flex bg-[#0B0E2C]">
      {/* Left brand panel */}
      <div className="relative hidden w-1/2 overflow-hidden lg:flex lg:flex-col lg:justify-between p-12 bg-white"  style={{padding: "3rem"}}>
        {/* decorative blobs */}
        {/* <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-fuchsia-400/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[28rem] w-[28rem] translate-x-1/4 translate-y-1/4 rounded-full bg-indigo-300/30 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-300/20 blur-3xl" /> */}

        <div className="relative z-10 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm ring-1 ring-white/30" style={{ marginTop: "1rem" }}>
            <BookOpen className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <img  src={Logo} alt="Knowe Logo" height="150" width="150"/>
        </div>

        {/* <div className="relative z-10 max-w-md">
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm ring-1 ring-white/25">
            <Sparkles className="h-3.5 w-3.5" />
            Learning made playful
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight text-white">
            Pick up right where your class left off.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-violet-100/80">
            Courses, boards, and progress — all waiting for you on the other
            side of this login.
          </p>
        </div> */}

        <img src={Book} alt="Book"/>

        <div className="relative z-10 flex items-center gap-6 text-violet-100/70 text-sm">
          <span>Courses</span>
          <span className="h-1 w-1 rounded-full bg-violet-100/40" />
          <span>Boards</span>
          <span className="h-1 w-1 rounded-full bg-violet-100/40" />
          <span>Progress</span>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex w-full items-center justify-center bg-[#F7F7FB] px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          {/* mobile brand mark */}
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500">
              <BookOpen className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-slate-900">
              Knowe
            </span>
          </div>

          <h2 className="font-display text-4xl font-bold text-slate-900">
            Learning Content
          </h2>
          <p className="mt-2 text-slate-500" style={{ marginTop: "0.7rem", marginBottom: "1.5rem"}}>
            Learning that meets you where you are .. and takes you where you can go..
          </p>

          <h2 className="font-display text-3xl font-bold text-slate-900" style={{ marginBottom: "1rem"}}>
            Welcome
          </h2>

          {error && (
            <div className="mt-6 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
              <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-500" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Email
              </label>
              <div className="relative">
                {/* <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /> */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    clearError();
                    setEmail(e.target.value);
                  }}
                  style={{ paddingLeft: "1rem", marginBottom: "1.5rem"}}
                  className="w-full rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15 h-[50px]"
                  placeholder="Enter your email"
                />
              </div>
              {touched && !email && (
                <p className="mt-1.5 text-xs font-medium text-rose-500">
                  Enter your email to continue.
                </p>
              )}
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
              </div>
              <div className="relative">
                {/* <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" /> */}
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    clearError();
                    setPassword(e.target.value);
                  }}
                  style={{ paddingLeft: "1rem", marginBottom: "1.5rem"}}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15 h-[50px]"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4.5 w-4.5" />
                  ) : (
                    <Eye className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>
              {touched && !password && (
                <p className="mt-1.5 text-xs font-medium text-rose-500">
                  Enter your password to continue.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:shadow-xl hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-60 h-[50px] flex justify-center items-center gap-2 cursor-pointer group-hover:translate-x-0.5 transition-all"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Logging in...
                </>
              ) : (
                <>
                  Log in
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          {/* <p className="mt-8 text-center text-sm text-slate-500">
            New to Knowe?{" "}
            <a href="#" className="font-semibold text-violet-600 hover:text-violet-700">
              Create an account
            </a>
          </p> */}
        </div>
      </div>
    </div>
  );
}