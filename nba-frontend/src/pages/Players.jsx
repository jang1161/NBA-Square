import React, { useEffect, useState } from "react";

export default function Players() {
	const [players, setPlayers] = useState([]);
	const [viewByTeam, setViewByTeam] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch("http://localhost:8080/api/players")
			.then((res) => {
				if (!res.ok) throw new Error("선수 정보를 불러오지 못했습니다.");
				return res.json();
			})
			.then((data) => {
				const sorted = data.sort((a, b) => a.fullName.localeCompare(b.fullName));
				setPlayers(sorted);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	const toggleView = () => {
		setViewByTeam((prev) => !prev);
	};

	const filteredPlayers = players.filter((player) =>
		player.fullName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const groupedByTeam = filteredPlayers.reduce((acc, player) => {
		const team = player.teamAbbreviation || "FA"; // FA = 자유계약
		if (!acc[team]) acc[team] = [];
		acc[team].push(player);
		return acc;
	}, {});

	if (loading) return <div className="p-6">로딩 중...</div>;
	if (error) return <div className="p-6 text-red-500">{error}</div>;

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">Players List</h1>

			<div className="flex items-center justify-start mb-6 gap-4">
				<button
					onClick={toggleView}
					className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition"
				>
					{viewByTeam ? "전체 보기" : "팀별 보기"}
				</button>

				<input
					type="text"
					placeholder="선수 검색"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="border p-2 rounded w-64"
				/>
			</div>
			
			{/* 선수 목록 */}
			{!viewByTeam ? (
				<div className="grid grid-cols-3 gap-2 text-sm">
					{filteredPlayers.map((player) => (
						<div
							key={player.id}
							className="flex justify-between border-b pb-1 px-2"
						>
							<span>{player.fullName}</span>
							<span className="text-gray-600">{player.teamAbbreviation}</span>
						</div>
					))}
				</div>
			) : (
				Object.keys(groupedByTeam)
					.sort()
					.map((team) => (
						<div key={team} className="mb-4">
							<h2 className="font-bold mb-2 text-blue-700">{team}</h2>
							<div className="grid grid-cols-3 gap-2 text-sm">
								{groupedByTeam[team].map((player) => (
									<div
										key={player.id}
										className="flex justify-between border-b pb-1 px-2"
									>
										<span>{player.fullName}</span>
										<span className="text-gray-600">{player.teamAbbreviation}</span>
									</div>
								))}
							</div>
						</div>
					))
			)}
		</div>
	);
}
