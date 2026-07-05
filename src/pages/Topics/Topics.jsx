import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { topicsAPI } from "../../services/api";

export default function Topics() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    boardId,
    boardName,

    classId,
    className,

    subjectId,
    subjectName,

    chapterId,
    chapterName,
  } = state;

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await topicsAPI.getAll(classId, subjectId, chapterId);

      console.log(response.data);

      if (response.data.success) {
        setTopics(response.data.data);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to load topics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading Topics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold">{chapterName}</h1>

      <button
        onClick={() =>
          navigate("/chapters", {
            state: {
              boardId,
              boardName,
              classId,
              className,
              subjectId,
              subjectName,
            },
          })
        }
        className="mb-4 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-100"
      >
        ← Back
      </button>

      <p className="mb-8 text-gray-500">Select Topic</p>

      <div className="grid grid-cols-3 gap-6">
        {topics.map((topic) => (
          <div
            key={topic.lms_subject_topic_id}
            onClick={() =>
              navigate("/content", {
                state: {
                  boardId,
                  boardName,

                  classId,
                  className,

                  subjectId,
                  subjectName,

                  chapterId,
                  chapterName,

                  topicId: topic.lms_subject_topic_id,

                  topicName: topic.subject_topic_name,
                },
              })
            }
            className="cursor-pointer rounded-xl bg-white p-6 shadow transition hover:shadow-xl hover:scale-[1.02]"
          >
            <h2 className="text-xl font-bold">{topic.subject_topic_name}</h2>

            <p className="mt-2 text-gray-500">
              {topic.subject_topic_description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
