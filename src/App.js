import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage";
import CodeBlockPage from "./pages/CodeBlockPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LobbyPage />} />
        <Route path="/codeblocks/:id" element={<CodeBlockPage />} />
      </Routes>
    </Router>
  );
};

export default App;
