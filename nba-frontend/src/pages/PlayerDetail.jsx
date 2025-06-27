import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayerProfile from "../components/PlayerProfile";
import PlayerStat from "../components/PlayerStat";

export default function PlayerDetail() {
	const { id } = useParams();
	const [player, setPlayer] = useState(null);
	const [stats, setStats] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [playerRes, statRes] = await Promise.all([
					fetch(`http://localhost:8080/api/players/${id}`),
					fetch(`http://localhost:8080/api/players/${id}/stats`)
				]);

				if (!playerRes.ok || !statRes.ok) throw new Error("데이터를 불러오지 못했습니다.");

				const playerData = await playerRes.json();
				const statData = await statRes.json();

				setPlayer(playerData);
				setStats(statData);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

	if (loading) return <div className="p-6">로딩 중...</div>;
	if (error) return <div className="p-6 text-red-500">{error}</div>;
	if (!player) return <div className="p-6">선수 정보를 찾을 수 없습니다.</div>;

	return (
		<div className="max-w-5xl mx-auto p-6">
			<PlayerProfile player={player} />
			<PlayerStat stats={stats} />
		</div>
	);
}
