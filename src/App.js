import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LobbyPage from './components/LobbyPage';
import CodeBlockPage from './components/CodeBlockPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LobbyPage />} />
                <Route path="/code/" element={<CodeBlockPage />} />
            </Routes>
        </Router>
    );
};

export default App;
