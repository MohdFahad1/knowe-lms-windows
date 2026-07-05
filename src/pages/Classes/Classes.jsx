import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { classesAPI } from "../../services/api";

export default function Classes() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const { boardId, boardName } = state;

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await classesAPI.getByBoard(boardId);

      if (response.data.success && response.data.data.classes) {
        setClasses(response.data.data.classes);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to load classes");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading Classes...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <button
        onClick={() => navigate("/boards")}
        className="mb-4 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-100"
      >
        ← Back
      </button>

      <h1 className="mb-2 text-3xl font-bold">{boardName}</h1>

      <p className="mb-8 text-gray-500">Select Class</p>

      <div className="grid grid-cols-3 gap-6">
        {classes.map((item) => (
          <div
            key={item.id}
            onClick={() =>
              navigate("/subjects", {
                state: {
                  boardId,
                  boardName,

                  classId: item.id,
                  className: item.name,
                },
              })
            }
            className="cursor-pointer rounded-xl bg-white p-6 shadow transition hover:shadow-xl hover:scale-[1.02]"
          >
            <h2 className="text-xl font-bold">{item.name}</h2>

            <p className="mt-2 text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
