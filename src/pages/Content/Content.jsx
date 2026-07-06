import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { contentAPI } from "../../services/api";
import {
  ArrowLeft,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  PlayCircle,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import offlineAPI from "../../services/offlineApi";

// Cycle of accent gradients so each content item's icon badge gets its own personality
const ACCENTS = [
  "from-violet-600 to-fuchsia-500",
  "from-sky-500 to-indigo-500",
  "from-amber-400 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-rose-500 to-pink-500",
];

// Pick an icon based on the content's declared type/kind
function getContentIcon(item) {
  const type = `${item.lms_subject_topic_data_type || ""} ${
    item.lms_subject_topic_data_kind || ""
  }`.toLowerCase();

  if (type.includes("quiz") || type.includes("test")) return HelpCircle;
  if (type.includes("video") || type.includes("animation")) return PlayCircle;
  if (type.includes("image")) return ImageIcon;
  if (type.includes("pdf") || type.includes("doc")) return FileText;
  return Sparkles;
}

export default function Content() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { classId, subjectId, chapterId, topicId, topicName } = state;

  const [contents, setContents] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchContent();
  }, []);

  // const fetchContent = async () => {
  //   setLoading(true);
  //   setErrorMsg("");
  //   try {
  //     const response = await contentAPI.getAll(
  //       classId,
  //       subjectId,
  //       chapterId,
  //       topicId,
  //     );

  //     console.log(response.data);

  //     if (response.data.success) {
  //       const data = response.data.data || [];

  //       setContents(data);

  //       if (data.length > 0) {
  //         setSelectedContent(data[0]);
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     setErrorMsg("Failed to load content");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchContent = async () => {
  setLoading(true);
  setErrorMsg("");

  try {
    const data = await offlineAPI.getContent(
      classId,
      subjectId,
      chapterId,
      topicId
    );

    console.log("CONTENT DATA:", data);
    console.log("IS ARRAY:", Array.isArray(data));

    setContents(data);

    if (data.length > 0) {
      setSelectedContent(data[0]);
    } else {
      setSelectedContent(null);
    }
  } catch (err) {
    console.error("Content Error:", err);
    setErrorMsg("Failed to load content");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex h-screen bg-[#F7F7FB]">
      {/* Left Sidebar */}
      <div className="flex w-80 flex-shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-violet-600 to-fuchsia-500 p-5"  style={{ padding: "1rem" }}>
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

          <button
            onClick={() => navigate(-1)}
            className="group mb-4 flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20 cursor-pointer"
            style={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back
          </button>

          <h1 className="font-display text-xl font-bold leading-tight text-white">
            {topicName}
          </h1>

          <p className="mt-1 flex items-center gap-1.5 text-sm text-violet-100/85">
            <Sparkles className="h-3.5 w-3.5" />
            Learning content
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading &&
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse border-b border-slate-100 p-4">
                <div className="mb-2 h-4 w-2/3 rounded bg-slate-200" />
                <div className="h-3 w-1/3 rounded bg-slate-100" />
              </div>
            ))}

          {!loading && errorMsg && (
            <div className="flex flex-col items-center px-5 py-10 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50">
                <RefreshCw className="h-5 w-5 text-rose-500" />
              </div>
              <p className="mb-1 text-sm font-semibold text-slate-900">
                {errorMsg}
              </p>
              <button
                onClick={fetchContent}
                className="mt-3 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-2 text-xs font-semibold text-white shadow-sm"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !errorMsg && contents.length === 0 && (
            <div className="flex flex-col items-center px-5 py-10 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-50">
                <Sparkles className="h-5 w-5 text-violet-500" />
              </div>
              <p className="text-sm font-semibold text-slate-900">
                No content here yet
              </p>
            </div>
          )}

          {!loading &&
            !errorMsg &&
            contents.map((item, i) => {
              const active =
                selectedContent?.lms_subject_topic_data_id ===
                item.lms_subject_topic_data_id;
              const Icon = getContentIcon(item);
              const accent = ACCENTS[i % ACCENTS.length];

              return (
                <div
                  key={item.lms_subject_topic_data_id}
                  onClick={() => setSelectedContent(item)}
                  style={{ animationDelay: `${i * 40}ms`, padding: "1rem" }}
                  className={`relative flex animate-[fadeInUp_0.35s_ease-out_backwards] cursor-pointer items-center gap-3 border-b border-slate-100 p-4 transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 shadow-inner"
                      : "hover:bg-slate-50"
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-white/70" />
                  )}

                  <div
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${
                      active
                        ? "bg-white/20"
                        : `bg-gradient-to-br ${accent}`
                    }`}
                  >
                    <Icon
                      className={`h-4.5 w-4.5 ${
                        active ? "text-white" : "text-white"
                      }`}
                      strokeWidth={2.25}
                    />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className={`truncate text-sm font-semibold ${
                        active ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {item.lms_subject_topic_data_file_code_name ||
                        item.lms_subject_topic_data_kind ||
                        "Interactive Content"}
                    </h3>

                    <p
                      className={`mt-0.5 truncate text-xs ${
                        active ? "text-violet-100/85" : "text-slate-500"
                      }`}
                    >
                      {item.lms_subject_topic_data_type}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Right Player */}
      <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-[#EDE9FE] via-[#F5F3FF] to-[#FDF2F8]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-300/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-fuchsia-300/20 blur-3xl" />

        {loading ? (
          <div className="relative flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
              <p className="text-sm font-medium text-slate-500">
                Loading content...
              </p>
            </div>
          </div>
        ) : selectedContent ? (
          <div
            key={selectedContent.lms_subject_topic_data_id}
            className="relative h-full w-full animate-[fadeIn_0.3s_ease-out] p-4 sm:p-6"
          >
            <div className="h-full w-full overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
              <iframe
                title="content-player"
                src={
                  selectedContent.html5_file_name_app ||
                  selectedContent.html5_file_name
                }
                className="h-full w-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <div className="relative flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
              <Sparkles className="h-7 w-7 text-violet-400" />
            </div>
            <h2 className="font-display text-xl font-bold text-slate-700">
              No Content Available
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Nothing to show for this topic yet.
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}