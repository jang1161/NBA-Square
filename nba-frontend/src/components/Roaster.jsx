import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PlayerRoster({ teamId }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [season, setSeason] = useState("2024-25");

  const availableSeasons = [
    "2024-25", "2023-24", "2022-23", "2021-22", "2020-21",
    "2019-20", "2018-19", "2017-18", "2016-17", "2015-16"
  ];

  useEffect(() => {
    if (!teamId) return;

    fetch(`http://localhost:8080/api/players/team/${teamId}?season=${season}`)
      .then(res => {
        if (!res.ok) throw new Error("선수 데이터를 불러올 수 없습니다.");
        return res.json();
      })
      .then(data => {
        setPlayers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [teamId, season]);

  const handleSeasonChange = (e) => {
    setSeason(e.target.value);
  };

  if (loading) return <div className="text-center py-4">선수 로스터 로딩 중...id={teamId}</div>;
  if (error) return <div className="text-red-500 py-4">{error}</div>;
  if (players.length === 0) return <div className="py-4">등록된 선수가 없습니다.</div>;

  return (
    <div className="space-y-4">

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="season-select" className="text-sm font-medium text-gray-700">
            Season:
          </label>
          <select
            id="season-select"
            value={season}
            onChange={handleSeasonChange}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {availableSeasons.map(season => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
        </div>
      </div>


      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">No.</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Position</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Height</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Weight</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Age</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr
                key={player.id}
                className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                  }`}
              >
                <td className="py-3 px-4">
                  <Link to={`/players/${player.id}`} className="cursor-pointer hover:underline font-semibold">
                    {player.fullName}
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-gray-600">#{player.jersey}</span>
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {player.position || 'N/A'}
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {player.height || 'N/A'}
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {player.weight ? `${player.weight} lbs` : 'N/A'}
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {player.age ? `${player.age}` : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}