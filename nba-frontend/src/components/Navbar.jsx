import { Link } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("user_name");
    setIsLoggedIn(!!name);
  }, []);

  return (
    <nav className="bg-gray-800 p-2 text-white flex items-center">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-2 ml-5">
          <img src="/logos/nba.png" alt="NBA Logo" className="h-12 rounded-sm" />
          <span className="text-2xl font-bold">NBA Square</span>
        </Link>

        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/teams" className="hover:underline">Teams</Link>
        <Link to="/players" className="hover:underline">Players</Link>
        <Link to="/board" className="hover:underline">Board</Link>
        <Link to="/chat" className="hover:underline">Chat</Link>
      </div>

      <div className="ml-auto mr-5 p-1 border border-white rounded-md">
        {isLoggedIn ? (<Logout />) : (<Login />)}
      </div>
    </nav>
  );
}
