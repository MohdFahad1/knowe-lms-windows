import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { subjectsAPI } from "../../services/api";
import Header from "../../components/Header";
import { ArrowLeft, ArrowRight, BookText, Layers, RefreshCw, Sparkles } from "lucide-react";

// Cycle of accent gradients so each subject card gets its own personality
const ACCENTS = [
  { grad: "from-violet-600 to-fuchsia-500" },
  { grad: "from-sky-500 to-indigo-500" },
  { grad: "from-amber-400 to-orange-500" },
  { grad: "from-emerald-500 to-teal-500" },
  { grad: "from-rose-500 to-pink-500" },
];

export default function Subjects() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { boardId, boardName, classId, className } = state;

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await subjectsAPI.getAll(classId);

      if (response.data.success) {
        setSubjects(response.data.data);
      }
    } catch (err) {
      console.log(err);
      setErrorMsg("Failed to load subjects");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#F3F0FF] via-[#FAF9FF] to-[#FFF1F8]">
      {/* ambient background blobs, echoes the boards/classes pages */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-fuchsia-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl" />
      
        <Header title={className} />

      <div style={{ padding: "1.5rem" }} className="relative w-full px-6 py-10 sm:px-10 lg:px-16">

        <button
          onClick={() =>
            navigate("/classes", {
              state: {
                boardId,
                boardName,
              },
            })
          }
          style={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
          className="group mb-4 mt-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-3.5 py-2 text-sm font-semibold text-slate-600 backdrop-blur-sm transition hover:border-violet-200 hover:bg-white hover:text-violet-600 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back
        </button>

        <div style={{ marginTop: "0.7rem", marginBottom: "1rem" }} className="mb-8 mt-2 flex items-center gap-2 text-sm text-slate-500">
          <Sparkles className="h-4 w-4 text-violet-500" />
          Select a subject to see its chapters.
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
              >
                <div className="mb-4 h-11 w-11 rounded-xl bg-slate-200" />
                <div className="mb-2 h-5 w-2/3 rounded bg-slate-200" />
                <div className="h-3.5 w-4/5 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        )}

        {!loading && errorMsg && (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-rose-100">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50">
              <RefreshCw className="h-6 w-6 text-rose-500" />
            </div>
            <p className="mb-1 font-display text-lg font-bold text-slate-900">
              {errorMsg}
            </p>
            <p className="mb-5 text-sm text-slate-500">
              Something went wrong on our end. Try again.
            </p>
            <button
              onClick={fetchSubjects}
              className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-500/25 transition hover:shadow-lg hover:shadow-violet-500/30"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !errorMsg && subjects.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-20 text-center shadow-sm ring-1 ring-slate-100">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-violet-50">
              <Layers className="h-6 w-6 text-violet-500" />
            </div>
            <p className="mb-1 font-display text-lg font-bold text-slate-900">
              No subjects yet
            </p>
            <p className="text-sm text-slate-500">
              Subjects for this class will show up here.
            </p>
          </div>
        )}

        {!loading && !errorMsg && subjects.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {subjects.map((subject, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              return (
                <div
                  key={subject.lms_subject_id}
                  onClick={() =>
                    navigate("/chapters", {
                      state: {
                        boardId,
                        boardName,
                        classId,
                        className,
                        subjectId: subject.lms_subject_id,
                        subjectName: subject.subject_name,
                      },
                    })
                  }
                  style={{ animationDelay: `${i * 60}ms`, padding: "0.7rem" }}
                  className="group animate-[fadeInUp_0.4s_ease-out_backwards] cursor-pointer rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-[120px] flex flex-col justify-between"
                >
                  <div
                    className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${accent.grad} shadow-md transition-transform duration-300 group-hover:scale-110`}
                  >
                    <BookText className="h-5 w-5 text-white" strokeWidth={2.25} />
                  </div>

                  <h2 className="font-display text-2xl font-bold text-slate-900" >
                    {subject.subject_name}
                  </h2>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="truncate text-sm text-slate-500">
                      {subject.subject_description}
                    </p>
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-violet-500" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}