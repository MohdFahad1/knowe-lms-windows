import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { chaptersAPI } from "../../services/api";

export default function Chapters() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { boardId, boardName, classId, className, subjectId, subjectName } =
    state;

  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    try {
      const response = await chaptersAPI.getBySubject(classId, subjectId);

      console.log(response.data);

      if (response.data.success) {
        setChapters(response.data.data);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to load chapters");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading Chapters...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold">{subjectName}</h1>

      <button
        onClick={() =>
          navigate("/subjects", {
            state: {
              boardId,
              boardName,
              classId,
              className,
            },
          })
        }
        className="mb-4 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-100"
      >
        ← Back
      </button>

      <p className="mb-8 text-gray-500">Select Chapter</p>

      <div className="grid grid-cols-3 gap-6">
        {chapters.map((chapter) => (
          <div
            key={chapter.lms_subject_chapter_id}
            onClick={() =>
              navigate("/topics", {
                state: {
                  boardId,
                  boardName,

                  classId,
                  className,

                  subjectId,
                  subjectName,

                  chapterId: chapter.lms_subject_chapter_id,

                  chapterName: chapter.subject_chapter_name,
                },
              })
            }
            className="cursor-pointer rounded-xl bg-white p-6 shadow transition hover:shadow-xl hover:scale-[1.02]"
          >
            <h2 className="text-xl font-bold">
              {chapter.subject_chapter_name}
            </h2>

            <p className="mt-2 text-gray-500">
              {chapter.subject_chapter_description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
