import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import localTeams from "../data/teams"; // slug, position 포함된 로컬 프론트 데이터

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/teams")
      .then(res => res.json())
      .then(data => {
        // slug, position 병합
        const merged = data.map(team => {
          const local = localTeams.find(t => t.id === team.id);
          return {
            ...team,
            slug: local?.slug,
            position: local?.position,
          };
        });
        setTeams(merged);
        setLoading(false);
      });
  }, []);

  const toggleView = () => {
    setViewMode(prev => (prev === "map" ? "list" : "map"));
  };

  if (loading) return <div className="p-6">로딩 중...</div>;

  return (
    <div className="relative w-full h-screen p-4">
      {/* 보기 전환 버튼 */}
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <button
          onClick={toggleView}
          className="px-4 py-2 bg-slate-800 text-white rounded-lg shadow-md hover:bg-slate-700 transition duration-150 pointer-events-auto"
        >
          {viewMode === "map" ? "List" : "Map"}
        </button>
      </div>

      {/* 지도 보기 */}
      {viewMode === "map" && (
        <div className="relative w-[1200px] mx-auto overflow-hidden">
        <img
            src="/North_America.jpg"
            alt="North America Map"
            className="w-full h-full object-cover"
          />
          {teams.map(team => (
            team.position && (
              <Link
                key={team.id}
                to={`/teams/${team.slug}`}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: team.position.left, top: team.position.top }}
                title={team.name}
              >
                <img src={`/logos/${team.slug}.png`} alt={team.name} className="w-14" />
              </Link>
            )
          ))}
        </div>
      )}

      {/* 리스트 보기 */}
      {viewMode === "list" && (
        <div className="flex h-full overflow-y-auto bg-white p-6 gap-6">
          {/* 서부 컨퍼런스 */}
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4">Western Conference</h2>
            <ul>
              {teams
                .filter(team => team.conference === "West")
                .map(team => (
                  <li key={team.id} className="mb-4 border-b pb-2">
                    <Link
                      to={`/teams/${team.slug}`}
                      className="flex items-center space-x-4 hover:underline"
                    >
                      <img src={`/logos/${team.slug}.png`} alt={team.name} className="w-10" />
                      <div>
                        <p className="font-bold">{team.full_name}</p>
                        <p className="text-sm text-gray-600">{team.city} / {team.division}</p>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* 동부 컨퍼런스 */}
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4">Eastern Conference</h2>
            <ul>
              {teams
                .filter(team => team.conference === "East")
                .map(team => (
                  <li key={team.id} className="mb-4 border-b pb-2">
                    <Link
                      to={`/teams/${team.slug}`}
                      className="flex items-center space-x-4 hover:underline"
                    >
                      <img src={`/logos/${team.slug}.png`} alt={team.name} className="w-10" />
                      <div>
                        <p className="font-bold">{team.full_name}</p>
                        <p className="text-sm text-gray-600">{team.city} / {team.division}</p>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
