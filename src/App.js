import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage";
import CodeBlockPage from "./pages/CodeBlockPage";

const App = () => {
  return (
    <div className="app-page">
      <Router>
        <Routes>
          <Route path="/" element={<LobbyPage />} />
          <Route path="/codeblocks/:id" element={<CodeBlockPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
