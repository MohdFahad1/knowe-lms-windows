import { useEffect, useState } from "react";
import { boardsAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Boards() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await boardsAPI.getAll();

      if (response.data.success) {
        setBoards(response.data.data);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to load boards");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading Boards...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="mb-8 text-3xl font-bold">Select Board</h1>

      <div className="grid grid-cols-3 gap-6">
        {boards.map((board) => (
          <div
            key={board.boardId}
            onClick={() =>
              navigate("/classes", {
                state: {
                  boardId: board.boardId,
                  boardName: board.boardName,
                },
              })
            }
            className="cursor-pointer rounded-xl bg-white p-6 shadow transition hover:shadow-xl hover:scale-[1.02]"
          >
            <h2 className="text-xl font-bold">{board.boardName}</h2>

            <p className="mt-2 text-gray-500">
              {board.classes?.length || 0} Classes
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
