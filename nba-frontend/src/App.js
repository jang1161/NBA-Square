import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import Players from "./pages/Players";
import Board from "./pages/Board";
import BoardWrite from "./pages/BoardWrite";
import PostDetail from "./pages/PostDetail";

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/teams/:slug" element={<TeamDetail />} />
                <Route path="/players" element={<Players />} />
                <Route path="/board" element={<Board />} />
                <Route path="/board/create" element={<BoardWrite />} />
                <Route path="/board/:id" element={<PostDetail />} />
            </Routes>
        </Router>
    );
}
