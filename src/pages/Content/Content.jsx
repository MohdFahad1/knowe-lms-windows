import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { contentAPI } from "../../services/api";

export default function Content() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { classId, subjectId, chapterId, topicId, topicName } = state;

  const [contents, setContents] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await contentAPI.getAll(
        classId,
        subjectId,
        chapterId,
        topicId,
      );

      console.log(response.data);

      if (response.data.success) {
        const data = response.data.data || [];

        setContents(data);

        if (data.length > 0) {
          setSelectedContent(data[0]);
        }
      }
    } catch (err) {
      console.log(err);
      alert("Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading Content...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Left Sidebar */}

      <div className="w-80 border-r bg-white">
        <div className="border-b p-5">
          <button
            onClick={() =>
              navigate("/topics", {
                state: {
                  boardId,
                  boardName,
                  classId,
                  className,
                  subjectId,
                  subjectName,
                  chapterId,
                  chapterName,
                },
              })
            }
            className="mb-4 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-100"
          >
            ← Back
          </button>

          <h1 className="text-2xl font-bold">{topicName}</h1>

          <p className="text-gray-500">Learning Content</p>
        </div>

        <div className="overflow-y-auto">
          {contents.map((item) => {
            const active =
              selectedContent?.lms_subject_topic_data_id ===
              item.lms_subject_topic_data_id;

            return (
              <div
                key={item.lms_subject_topic_data_id}
                onClick={() => setSelectedContent(item)}
                className={`cursor-pointer border-b p-4 transition

                ${active ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
              >
                <h3 className="font-semibold">
                  {item.lms_subject_topic_data_file_code_name ||
                    item.lms_subject_topic_data_kind ||
                    "Interactive Content"}
                </h3>

                <p
                  className={`mt-1 text-sm ${
                    active ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {item.lms_subject_topic_data_type}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Player */}

      <div className="flex-1 bg-gray-200">
        {selectedContent ? (
          <iframe
            title="content-player"
            src={
              selectedContent.html5_file_name_app ||
              selectedContent.html5_file_name
            }
            className="h-full w-full border-0"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <h2 className="text-2xl text-gray-500">No Content Available</h2>
          </div>
        )}
      </div>
    </div>
  );
}
