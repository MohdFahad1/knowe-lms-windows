import { HashRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Boards from "../pages/Boards/Boards";
import Classes from "../pages/Classes/Classes";
import Subjects from "../pages/Subjects/Subjects";
import Chapters from "../pages/Chapters/Chapters";
import Topics from "../pages/Topics/Topics";
import Content from "../pages/Content/Content";

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/chapters" element={<Chapters />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/content" element={<Content />} />
      </Routes>
    </HashRouter>
  );
}
