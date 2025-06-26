import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import teams from "../data/teams";
import PlayerRoster from "../components/Roaster";

export default function TeamDetail() {
  const { slug } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("roster");

  useEffect(() => {
    const teamInfo = teams.find(t => t.slug === slug);
    if (!teamInfo) {
      setError("잘못된 팀 경로입니다.");
      setLoading(false);
      return;
    }

    const teamId = teamInfo.id;

    fetch(`http://localhost:8080/api/teams/${teamId}`)
      .then(res => {
        if (!res.ok) throw new Error("팀 정보를 불러올 수 없습니다.");
        return res.json();
      })
      .then(data => {
        setTeam(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="p-6">로딩 중...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!team) return <div className="p-6">팀을 찾을 수 없습니다.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{team.fullName}</h1>

      {/* 로고 + 팀 정보 영역 */}
      <div className="flex items-start gap-6 mb-6">
        <img src={`/logos/${slug}.png`} alt={team.name} className="h-32" />
        <div className="space-y-1">
          <p><strong className="inline-block w-28">City</strong> {team.city}</p>
          <p><strong className="inline-block w-28">Conference</strong> {team.conference}</p>
          <p><strong className="inline-block w-28">Division</strong> {team.division}</p>
          <p><strong className="inline-block w-28">Abbreviation</strong> {team.abbreviation}</p>
        </div>
      </div>

      {/* 탭 버튼 */}
      <div className="flex border-b mb-6">
        {["roster", "coach", "stats", "schedule"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 -mb-px border-b-2 font-semibold ${
              activeTab === tab ? "border-gray-800 text-gray-800" : "border-transparent text-gray-600"
            }`}
          >
            {tab === "roster" && "Roster"}
            {tab === "coach" && "Coach"}
            {tab === "stats" && "Season Stats"}
            {tab === "schedule" && "Schedule"}
          </button>
        ))}
      </div>

      {/* 탭 내용 */}
      <div>
        {activeTab === "roster" && <PlayerRoster teamId={team.id} />}

        {activeTab === "coach" && (
          <div>
            <p>감독 정보는 아직 없습니다.</p>
          </div>
        )}

        {activeTab === "stats" && (
          <div>
            <p>시즌별 성적 데이터는 아직 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );

}
