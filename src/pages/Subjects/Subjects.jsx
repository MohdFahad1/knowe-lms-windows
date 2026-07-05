import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { subjectsAPI } from "../../services/api";

export default function Subjects() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { boardId, boardName, classId, className } = state;

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await subjectsAPI.getAll(classId);

      if (response.data.success) {
        setSubjects(response.data.data);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to load subjects");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading Subjects...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold">{className}</h1>

      <button
        onClick={() =>
          navigate("/classes", {
            state: {
              boardId,
              boardName,
            },
          })
        }
        className="mb-4 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-100"
      >
        ← Back
      </button>

      <p className="mb-8 text-gray-500">Select Subject</p>

      <div className="grid grid-cols-3 gap-6">
        {subjects.map((subject) => (
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
            className="cursor-pointer rounded-xl bg-white p-6 shadow hover:shadow-xl transition hover:scale-[1.02]"
          >
            <h2 className="text-xl font-bold">{subject.subject_name}</h2>

            <p className="mt-2 text-gray-500">{subject.subject_description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
