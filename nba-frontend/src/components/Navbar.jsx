import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-2 text-white flex items-center space-x-4">
      <Link to="/" className="flex items-center space-x-2">
        <img src="/logos/nba.png" alt="NBA Logo" className="h-12 rounded-sm ml-5" />
        <span className="text-2xl font-bold">NBA Square</span>
      </Link>

      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/teams" className="hover:underline">Teams</Link>
      <Link to="/players" className="hover:underline">Players</Link>
      <Link to="/board" className="hover:underline">Board</Link>
    </nav>
  );
}
