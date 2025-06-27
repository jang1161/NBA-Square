import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import Players from "./pages/Players";
import Board from "./pages/Board";
import BoardWrite from "./pages/BoardWrite";
import PostDetail from "./pages/PostDetail";
import PlayerDetail from "./pages/PlayerDetail";
import OAuthCallback from "./pages/OAuthCallback";

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/teams/:slug" element={<TeamDetail />} />
                <Route path="/players" element={<Players />} />
                <Route path="/players/:id" element={<PlayerDetail />} />
                <Route path="/board" element={<Board />} />
                <Route path="/board/create" element={<BoardWrite />} />
                <Route path="/board/:id" element={<PostDetail />} />
                <Route path="/oauth/callback" element={<OAuthCallback />} />
            </Routes>
        </Router>
    );
}
