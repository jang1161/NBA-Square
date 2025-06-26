import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PlayerDetail() {
	const { id } = useParams();
	const [player, setPlayer] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch(`http://localhost:8080/api/players/${id}`)
			.then(res => {
				if (!res.ok) throw new Error("선수 정보를 불러오지 못했습니다.");
				return res.json();
			})
			.then(data => {
				setPlayer(data);
				setLoading(false);
			})
			.catch(err => {
				setError(err.message);
				setLoading(false);
			});
	}, [id]);

	if (loading) return <div className="p-6">로딩 중...</div>;
	if (error) return <div className="p-6 text-red-500">{error}</div>;
	if (!player) return <div className="p-6">선수 정보를 찾을 수 없습니다.</div>;

	return (
		<div className="max-w-3xl mx-auto p-6">
			<div className="flex items-center gap-12 mb-8 text-gray-700">
				<div>
					<img
						src={`https://cdn.nba.com/headshots/nba/latest/260x190/${player.id}.png`}
						alt={player.fullName}
						className="w-[200px] rounded-md object-cover"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<h1 className="text-3xl font-bold">{player.fullName}</h1>
					<p className="text-sm text-gray-500">
						{player.teamName} • #{player.jersey} • {player.position}
					</p>

					{/* 상세 정보 */}
					<div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
						<div><strong className="inline-block w-20">Height</strong> {player.height}</div>
						<div><strong className="inline-block w-20">Contry</strong> {player.country}</div>
						<div><strong className="inline-block w-20">Weight</strong> {player.weight}</div>
						<div><strong className="inline-block w-20">Draft</strong> {player.draft}</div>
						<div><strong className="inline-block w-20">Age</strong> {player.age}</div>
						<div><strong className="inline-block w-20">Attended</strong> {player.school}</div>
					</div>
				</div>
			</div>


			{/* 스탯 영역 (나중에 컴포넌트로 교체) */}
			<div>
				{/* 나중에 여기 Stats 컴포넌트 넣기 */}
			</div>
		</div>
	);
}
